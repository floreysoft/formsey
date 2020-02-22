import { createField, Field, FormDefinition, ValueChangedEvent } from '@formsey/core';
import { css, customElement, html, property, query, queryAll, TemplateResult } from 'lit-element';
import { InvalidError, InvalidEvent } from './InvalidEvent';

export enum GridSize {
  SMALL = "gridSmall",
  MEDIUM = "gridMedium",
  LARGE = "gridLarge"
}

@customElement("formsey-form")
export class FormField extends Field<FormDefinition, Object> {
  @property({ converter: Object })
  set value(value: Object) {
    this._value = value;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  @property({ converter: Object })
  set definition(definition: FormDefinition) {
    this._definition = definition;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  protected _value: Object = {}
  protected _definition: FormDefinition

  @queryAll(".fs-form-field")
  protected _fields: HTMLElement[]
  protected errors : InvalidError[]

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
  private grid : HTMLElement
  private gridSize : GridSize
  private resizeHandler = ((e: Event) => this.resize())

  renderField() {
    let templates: TemplateResult[] = []
    let grid = "grid-column-templates:100%"
    if ( this.gridSize == GridSize.LARGE && this.definition.gridLarge ) {
      grid = this.definition.gridLarge
    } else if ( this.gridSize == GridSize.MEDIUM && this.definition.gridMedium ) {
      grid = this.definition.gridMedium
    } else if ( this.gridSize == GridSize.SMALL && this.definition.gridSmall ) {
      grid = this.definition.gridSmall
    }
    for (let field of this.definition.fields) {
      if (grid && grid.indexOf('grid-template-areas') >= 0 ) {
        templates.push(html`<div class='fs-form-field' style="grid-area:_${field.name}">
        ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        </div>`)
      } else {
        templates.push(html`<div class='fs-form-field'>
        ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        </div>`)
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
      let child = field.firstElementChild as Field<any,any>
      let valid = child.checkValidity();
      if (!valid) {
        validity = false;
      }
    }
    if ( !validity ) {
      this.dispatchEvent(new InvalidEvent(this.definition.name, "fieldIncorrect", this.errors))
    }
    return validity;
  }

  protected valueChanged(e: any) {
    e.stopPropagation()
    if (e.name) {
      this.value[e.name] = e.value;
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  protected applyHiddenFields() {
    if (this._definition && this._value) {
      for (let field of this._definition.fields) {
        if (field.type == "hidden") {
          if (field.name && field.default) {
            this._value[field.name] = field.default;
          }
        }
      }
    }
  }

  protected invalid(e : InvalidEvent) {
    for ( let error of e.errors ) {
      if ( this.definition.name ) {
        error.path = this.definition.name + "." + error.path
      }
      this.errors.push(error)
    }
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
    if ( this.gridSize != size ) {
      this.gridSize = size
      this.requestUpdate()
    }
  }
}