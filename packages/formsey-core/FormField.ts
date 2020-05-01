import { area, createField, Field, FormDefinition, ChangeEvent, register } from '@formsey/core';
import { css, customElement, html, property, query, queryAll, TemplateResult } from 'lit-element';
import { NestedFormDefinition } from './FieldDefinitions';
import { InvalidEvent } from './InvalidEvent';

export enum GridSize {
  SMALL = "gridSmall",
  MEDIUM = "gridMedium",
  LARGE = "gridLarge"
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

  protected _value: Object = {}
  protected _definition: FormDefinition

  @queryAll(".fs-form-field")
  protected _fields: HTMLElement[]

  static get styles() {
    return [...super.styles, css`
      .grid {
        display: inline-grid;
        grid-gap: 0px 5px;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .fs-form-field {
        width: 100%;
      }`];
  }

  @query(".grid")
  private grid: HTMLElement
  private gridSize: GridSize

  render() {
    let templates: TemplateResult[] = []
    let grid = "grid-template-columns: 100%"
    if (this.gridSize == GridSize.LARGE && this.definition.gridLarge) {
      grid = this.definition.gridLarge
    } else if (this.gridSize == GridSize.MEDIUM && this.definition.gridMedium) {
      grid = this.definition.gridMedium
    } else if (this.gridSize == GridSize.SMALL && this.definition.gridSmall) {
      grid = this.definition.gridSmall
    }
    if ( this.definition.label ) {
      templates.push(html`<div class="title">${this.definition.label}</div>`)
    }
    if ( this.definition.helpText ) {
      templates.push(html`<div class="description">${this.definition.helpText}</div>`)
    }
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
        if (grid && grid.indexOf('grid-template-areas') >= 0) {
          templates.push(html`<div class='fs-form-field' style="grid-area:_${area(field, this.definition.fields)}">${fieldTemplate}</div>`)
        } else {
          templates.push(html`<div class='fs-form-field'>${fieldTemplate}</div>`)
        }
      }
    }
    return html`<div class="grid" style="${grid}">${templates}</div>`
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

  public resize() {
    let size = GridSize.LARGE
    if (this.grid) {
      let width = this.grid.clientWidth;
      if (width < 576) {
        size = GridSize.SMALL
      } else if (width < 768) {
        size = GridSize.MEDIUM
      }
    }
    if (this.gridSize != size) {
      this.gridSize = size
      this.requestUpdate()
    }
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if ( child && typeof child['resize'] == "function") {
        child.resize()
      }
    }
  }

  public focus() {
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if ( child && child.hasAttribute("autofocus") && typeof child['focus'] == "function") {
        child.focus()
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
      this.addMemberValueIfPresent("gridSmall", newValue)
      this.addMemberValueIfPresent("gridMedium", newValue)
      this.addMemberValueIfPresent("gridLarge", newValue)
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