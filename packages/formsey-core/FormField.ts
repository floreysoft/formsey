import { createField, Field, FormDefinition, ValueChangedEvent } from '@formsey/core';
import { css, customElement, html, property, query, queryAll, TemplateResult } from 'lit-element';
import { InvalidError, InvalidEvent } from './InvalidEvent';

export enum GridSize {
  SMALL = "gridSmall",
  MEDIUM = "gridMedium",
  LARGE = "gridLarge"
}

@customElement("formsey-form-field")
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
  protected errors: {}

  async fetchDefinition(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.definition = data
      this.requestUpdate();
    } catch (reason) {
      console.error(reason.message)
    }
  }

  @property()
  set src(url: string) {
    this.fetchDefinition(url);
  }

  static get styles() {
    return [...super.styles, css`
      .grid {
        display: inline-grid;
        grid-column-gap: var(--lumo-space-xs, 0.2em);
        width: 100%;
        box-sizing: border-box;
      }

      .fs-form-field {
        width: 100%;
      }`];
  }

  @query(".grid")
  private grid: HTMLElement
  private gridSize: GridSize
  private resizeHandler = ((e: Event) => this.resize())

  renderField() {
    let templates: TemplateResult[] = []
    let grid = "grid-column-templates:100%"
    if (this.gridSize == GridSize.LARGE && this.definition.gridLarge) {
      grid = this.definition.gridLarge
    } else if (this.gridSize == GridSize.MEDIUM && this.definition.gridMedium) {
      grid = this.definition.gridMedium
    } else if (this.gridSize == GridSize.SMALL && this.definition.gridSmall) {
      grid = this.definition.gridSmall
    }
    if (this.definition.fields) {
      for (let field of this.definition.fields) {
        if (grid && grid.indexOf('grid-template-areas') >= 0) {
          templates.push(html`<div class='fs-form-field' style="grid-area:_${field.name}">
        ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        </div>`)
        } else {
          templates.push(html`<div class='fs-form-field'>
        ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        </div>`)
        }
      }
    }
    return html`<div class="grid" style="${grid}">${templates}</div>`
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("resizeForm", this.resizeHandler)
    this.resize()
  }

  disconnectedCallback() {
    window.removeEventListener("resizeForm", this.resizeHandler)
    super.disconnectedCallback()
  }

  public checkValidity() {
    this.errors = []
    let validity = true;
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      let valid = child.checkValidity();
      if (!valid) {
        validity = false;
      }
    }
    return validity;
  }

  protected valueChanged(e: any) {
    e.stopPropagation()
    if (this.value ) {
      if (e.name) {
        this.value[e.name] = e.value;
      }
      this.removeDeletedFields()
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
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
      }
      this.addMemberValueIfPresent("type", newValue)
      this.addMemberValueIfPresent("gridSmall", newValue)
      this.addMemberValueIfPresent("gridMedium", newValue)
      this.addMemberValueIfPresent("gridLarge", newValue)
      this._value = newValue
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

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    for ( let error of e.errors ) {
      this.errors[error.path] = error.errorMessage
    }
    let errors : InvalidError[] = []
    for ( let key in this.errors ) {
      errors.push(new InvalidError(this.definition.name ? this.definition.name+"."+key : key, this.errors[key]))
    }
    this.dispatchEvent(new InvalidEvent(errors))
  }

  private resize() {
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
  }
}