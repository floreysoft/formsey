import { area, ChangeEvent, createField, Field, FormDefinition, register } from '@formsey/core';
import { css, html, property, query, queryAll, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import ResizeObserver from 'resize-observer-polyfill';
import { Breakpoints, NestedFormDefinition } from './FieldDefinitions';
import { InvalidEvent } from './InvalidEvent';

export const SUPPORTED_BREAKPOINTS = ["xs", "s", "m", "l", "xl", "xxl"]

export const DEFAULT_BREAKPOINTS: Breakpoints = {
  "xs": 320,
  "s": 568,
  "m": 768,
  "l": 1024,
  "xl": 1366,
  "xxl": 1680
}

export class FormField extends Field<FormDefinition, Object> {
  @property({ converter: Object })
  set value(value: Object) {
    this._value = value
    this.applyHiddenFields()
    this.removeDeletedFields()
    this.requestUpdate()
  }

  get value() {
    return this._value;
  }

  @property({ converter: Object })
  set definition(definition: FormDefinition) {
    this._definition = definition;
    this.applyHiddenFields();
    this.removeDeletedFields()
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  @property()
  private gridSize: string = "l"

  protected _value: Object = {}
  protected _definition: FormDefinition

  @queryAll(".fs-form-field")
  protected _fields: HTMLElement[]

  private resizeObserver: ResizeObserver

  static get styles() {
    return [...super.styles, css`
      :host {
        display: block;
      }
      .title {
        font-size: var(--formsey-title-font-size, larger);
        font-family: var(--formsey-title-font-family, var(--formsey-font-family, inherit));
        font-weight: var(--formsey-title-font-weight, inherit);
        line-height: var(--formsey-title-line-height, inherit);
        color: var(--formsey-title-color, inherit);
        margin: var(--formsey-title-margin, var(--fs-padding, 12px 0 4px 0));
      }
      .description {
        font-size: var(--formsey-description-font-size, inherit);
        font-family: var(--formsey-description-font-family, var(--formsey-font-family, inherit));
        font-weight: var(--formsey-description-font-weight, inherit);
        line-height: var(--formsey-description-line-height, inherit);
        color: var(--formsey-description-color, #757c98);
        margin: var(--formsey-description-margin, var(--fs-padding, 12px 0 4px 0));
      }
      .section {
        padding: 5px;
      }
      .grid {
        display: inline-grid;
        grid-gap: 5px 5px;
        width: 100%;
        box-sizing: border-box;
      }
      .fs-form-field {
        width: 100%;
      }`];
  }

  @query(".grid")
  private grid: HTMLElement

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.layout(entry.contentRect.width)
      }
    });
  }

  render() {
    let templates: TemplateResult[] = []
    let style = "padding:10px"
    if (this.definition.layout) {
      style = this.definition.layout.style
    }
    let gridLayout = this.definition.layout?.grids?.[this.gridSize] ? this.definition.layout?.grids?.[this.gridSize] : "grid-template-columns:1fr;grid-gap:5px 5px"
    if (this.definition.fields) {
      for (let field of this.definition.fields) {
        let fieldErrors = {}
        let value: any
        if (field.hasOwnProperty('form') && !field.name) {
          // Anonymous nested form, so let's copy all form fields
          value = {}
          this.applyNestedFields(value, <NestedFormDefinition>field)
          this.applyNestedErrors(fieldErrors, <NestedFormDefinition>field)
        } else {
          value = this.value && field.name ? this.value[field.name] : undefined
          if (this.errors) {
            for (let error in this.errors) {
              if (this.definition.name && (error == this.definition.name + "." + field.name || error.startsWith(this.definition.name + "." + field.name + ".") || error.startsWith(this.definition.name + "." + field.name + "["))) {
                fieldErrors[error.substring((this.definition.name + ".").length)] = this.errors[error]
              } else if (error.startsWith(field.name + "[")) {
                fieldErrors[error] = this.errors[error]
              } else if (error == field.name || error.startsWith(field.name + ".")) {
                fieldErrors[error] = this.errors[error]
              }
            }
          }
        }
        let fieldTemplate = html`${createField(this.components, field, value, fieldErrors, (event: ChangeEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}`
        if (gridLayout.indexOf('grid-template-areas') >= 0) {
          templates.push(html`<div class='fs-form-field' style="grid-area:_${area(field, this.definition.fields)}">${fieldTemplate}</div>`)
        } else {
          templates.push(html`<div class='fs-form-field'>${fieldTemplate}</div>`)
        }
      }
    }
    let header: TemplateResult[] = []
    if (this.definition.label) {
      header.push(html`<div part="title" class="title">${this.definition.label}</div>`)
    }
    if (this.definition.helpText) {
      header.push(html`<div part="description" class="description">${this.definition.helpText}</div>`)
    }
    return html`<div class="section" style="${ifDefined(style)}">${header}<div class="grid" style="${gridLayout}">${templates}</div><div>`
  }

  connectedCallback() {
    this.addEventListener('gridChanged', this.nestedGridChanged)
  }

  disconnectedCallback() {
    this.removeEventListener('gridChanged', this.nestedGridChanged)
  }

  nestedGridChanged(e: CustomEvent) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('gridChanged', { bubbles: true, composed: true, detail: { name: e.detail.name+"."+this.definition.name, gridSize: e.detail.gridSize }}))
  }

  firstUpdated() {
    this.resizeObserver.observe(this.grid)
  }

  public validate(report: boolean) {
    let validity = true;
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      let valid: boolean
      if (report) {
        valid = child.reportValidity();
      } else {
        valid = child.checkValidity();
      }
      if (!valid) {
        validity = false;
      }
    }
    return validity;
  }

  public layout(availableWidth: number) {
    if (this.definition.layout?.grids) {
      let gridSize
      for (let size of SUPPORTED_BREAKPOINTS) {
        let breakpoint = this.definition?.layout?.breakpoints?.[size]
        if (typeof breakpoint === "undefined") {
          breakpoint = DEFAULT_BREAKPOINTS[size]
        }
        gridSize = this.definition.layout.grids[size] ? size : gridSize
        if (breakpoint > availableWidth && gridSize ) {
          if ( this.gridSize != gridSize ) {
            this.gridSize = gridSize
            this.dispatchEvent(new CustomEvent('gridChanged', { bubbles: true, composed: true, detail: { name: this.definition.name, gridSize }}))
            break;
          }
        }
      }
    }
  }

  public focusField(path: string) {
    if (path.startsWith(this.definition.name + ".")) {
      path = path.substring(this.definition.name.length + 1)
    }
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if (child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
        (<any>child).focusField(path)
      }
    }
  }

  protected changed(e: ChangeEvent<any>) {
    if (this.value && e.detail.name) {
      e.stopPropagation()
      let name = this.firstPathElement(e.detail.name);
      if (name) {
        if (name.startsWith('.')) {
          name = name.substring(1)
          e.detail.name = e.detail.name.substring(1)
          this.value = { ...this.value, ...e.detail.value }
        } else {
          this.value[name] = e.detail.value;
        }
        this.removeDeletedFields()
        this.dispatchEvent(new ChangeEvent(this.prependPath(e.detail.name), this.value));
      }
    }
  }

  protected removeDeletedFields() {
    if (this._definition && this._definition.fields && this._value) {
      // Remove values from fields that have been removed from the definition
      let newValue = {}
      for (let field of this._definition.fields) {
        if (typeof field.name != "undefined" && typeof this.value[field.name] != "undefined") {
          newValue[field.name] = this.value[field.name]
        }
        if (field.hasOwnProperty('form') && !field.name) {
          this.addUnnamedNestedFormFields(newValue, field as NestedFormDefinition)
        }
      }
      this.addMemberValueIfPresent("type", newValue)
      this.addMemberValueIfPresent("layout", newValue)
      this._value = newValue
    }
  }

  protected addUnnamedNestedFormFields(newValue: Object, nestedFormField: NestedFormDefinition) {
    for (let field of nestedFormField.form.fields) {
      if (typeof field.name != "undefined" && typeof this.value[field.name] != "undefined") {
        newValue[field.name] = this.value[field.name]
      }
      if (field.hasOwnProperty('form') && !field.name) {
        this.addUnnamedNestedFormFields(newValue, field as NestedFormDefinition)
      }
    }
  }

  protected addMemberValueIfPresent(name: string, newValue: Object) {
    if (typeof this.value[name] != "undefined") {
      newValue[name] = this.value[name]
    }
  }

  protected applyHiddenFields() {
    if (this._definition && this._definition.fields && this._value) {
      for (let field of this._definition.fields) {
        if (field.type == "hidden") {
          if (field.name && field.default) {
            this._value[field.name] = field.default;
          }
        }
      }
    }
  }

  protected applyNestedFields(value: Object, field: NestedFormDefinition) {
    for (let nestedField of field.form.fields) {
      if (nestedField) {
        value[nestedField.name] = this.value[nestedField.name]
        if (nestedField.hasOwnProperty('form') && !nestedField.name) {
          this.applyNestedFields(value, <NestedFormDefinition>nestedField)
        }
      }
    }
  }

  protected applyNestedErrors(fieldErrors: Object, field: NestedFormDefinition) {
    for (let nestedField of field.form.fields) {
      if (nestedField) {
        if (this.errors) {
          for (let error in this.errors) {
            if (this.definition.name && (error == this.definition.name + "." + nestedField.name || error.startsWith(this.definition.name + "." + nestedField.name + ".") || error.startsWith(this.definition.name + "." + nestedField.name + "["))) {
              fieldErrors[error.substring((this.definition.name + ".").length)] = this.errors[error]
            } else if (error.startsWith(nestedField.name + "[")) {
              fieldErrors[error] = this.errors[error]
            } else if (error == nestedField.name || error.startsWith(nestedField.name + ".")) {
              fieldErrors[error] = this.errors[error]
            }
          }
        }
        if (nestedField.hasOwnProperty('form') && !nestedField.name) {
          this.applyNestedErrors(fieldErrors, <NestedFormDefinition>nestedField)
        }
      }
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    for (let error in e.errors) {
      this.errors[this.definition.name ? this.definition.name + "." + error : error] = e.errors[error]
    }
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}
register('formsey-form-field', FormField)