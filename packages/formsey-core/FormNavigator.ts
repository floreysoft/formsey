import { html, LitElement, property, query, TemplateResult, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { FieldDefinition, register, InputFieldDefinition, NestedFormDefinition, Components } from ".";
import { InvalidError, InvalidErrors } from "./InvalidEvent";
import { get } from "./Form";
import { FormDefinition, OptionalSectionFieldDefinition, SelectableSectionFieldDefinition } from "./FieldDefinitions";

interface FieldInfo {
  filled: boolean
  required: boolean
  path: string
  focused: boolean
}

export class FormNavigator extends LitElement {
  @property({ converter: Object })
  components: Components

  @property({ type: Object })
  definition: FieldDefinition

  @property({ type: Object, hasChanged(newVal, oldVal) { return true } })
  value: any

  @property({ type: Object })
  set errors(errors: InvalidErrors) {
    this._errors = errors
    this._errorsArray = [...errors]
    this.requestUpdate()
  }

  @property()
  focusedPath: string

  @query("#prev")
  previousError: HTMLButtonElement

  @query("#next")
  nextError: HTMLButtonElement

  @query("#prevRequired")
  previousRequired: HTMLButtonElement

  @query("#nextRequired")
  nextRequired: HTMLButtonElement

  @query(".focused")
  focused: HTMLElement

  private _errors: InvalidErrors
  private _errorsArray: [string, InvalidError][]
  private _allFields: FieldInfo[] = []
  private _requiredFields: FieldInfo[] = []
  private focusedError: number = -1
  private focusedField: number = -1
  private focusedRequired: number = -1

  static get styles() {
    return css`
    :host {
      display: grid;
      grid-template-columns: auto max-content;
      align-items: center;
    }
    .dots {
      overflow-x: auto;
      scrollbar-width: none;
      line-height: 0;
    }
    .nav {
      display: flex;
      flex-direction: columns;
      align-items: center;
    }
    .fieldset {
      display: flex;
      flex-direction: row;
      align-items: center;
      line-height: 1em;
    }
    .fieldset .fieldset {
      background-color: #00000011;
      border-radius: 2em;
      padding: 0;
      margin-right: 4px;
    }
    .dots::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .dot {
      cursor: pointer;
      width: 1.5em;
      height: 1.5em;
      min-width: 1.5em;
      border-radius: 50%;
      background-color: #a0a0a0;
      margin: .1em;
      border: 1px solid transparent;
      transition: all .2s ease-out;
      transform: scale(.65);
    }
    .filled {
      background-color: green;
    }
    .focused {
      transform: scale(1);
    }
    .required {
      background-color: orange;
    }
    .invalid {
      background-color: red;
    }
    .requiredFields {
      background-color: orange;
      border-radius: 3px;
      padding: 3px;
    }
    button {
      border: none;
      border-radius: 50%;
    }
    `
  }

  render() {
    this._allFields = []
    this._requiredFields = []
    let dots: TemplateResult[] = []
    if (this.definition) {
      this.addFields(this._allFields, dots, this.definition)
    }
    let requiredFilled = 0, totalFilled = 0
    this._allFields.forEach(fieldInfo => {
      if (fieldInfo.required) this._requiredFields.push(fieldInfo)
      requiredFilled += fieldInfo.required && fieldInfo.filled ? 1 : 0;
      totalFilled += fieldInfo.filled ? 1 : 0;
    })
    let nav = html`<div class="allFields">${totalFilled} / ${this._allFields.length}</div><div class="requiredFields">${requiredFilled} / ${this._requiredFields.length} <button id="prevRequired" @click="${e => { this.focusRequired(this.focusedRequired - 1) }}"><</button><button id="nextRequired" @click="${e => { this.focusRequired(this.focusedRequired + 1) }}">></button></div>`
    let errors = this._errorsArray ?
      html`${this._errorsArray.length} errors <button id="prev" disabled @click="${e => { this.focusError(this.focusedError - 1) }}">Prev</button><button id="next" @click="${e => { this.focusError(this.focusedError + 1) }}">Next</button>` :
      html`No errors`
    return html`<div class="dots">${dots}</div><div class="nav">${nav}${errors}</div>`
  }

  focusRequired(index: number) {
    this.focusedRequired = index
    this._requiredFields.forEach((fieldInfo, required) => {
      if (required == index) {
        this.previousRequired.disabled = index == 0
        this.nextRequired.disabled = index == this._requiredFields.length - 1
        this.dispatchEvent(new CustomEvent('focusField', { detail: fieldInfo.path }))
      }
    })
  }

  focusError(index: number) {
    this.focusedError = index
    this.previousError.disabled = index == 0
    this.nextError.disabled = index == this._errorsArray.length - 1
    this.dispatchEvent(new CustomEvent('focusField', { detail: this._errorsArray[index][0] }))
  }

  private addFields(fields: FieldInfo[], dots: TemplateResult[], fieldDefinition: FieldDefinition, path?: string) {
    path = path ? path + (fieldDefinition.name ? "." + fieldDefinition.name : '') : fieldDefinition.name
    let nestedDots: TemplateResult[] = []
    if (fieldDefinition.type == "repeatingSection") {
      fieldDefinition = (<NestedFormDefinition>fieldDefinition).form
      const sections = get(this.value, path)
      if (sections) {
        for (let i = 0; i < sections.length; i++) {
          this.addFields(fields, dots, fieldDefinition, path + "[" + i + "]")
        }
      }
    } else if (fieldDefinition.type == "optionalSection") {
      const checked = get(this.value, path)
      if (checked) {
        this.addField(fields, nestedDots, fieldDefinition, path)
        for (let field of ((<OptionalSectionFieldDefinition>fieldDefinition).form).fields) {
          this.addFields(fields, nestedDots, field, path)
        }
        dots.push(html`<div class="fieldset">${nestedDots}</div>`)
      } else {
        this.addField(fields, dots, fieldDefinition, path)
      }
    } else if (fieldDefinition.type == "selectableSection") {
      this.addField(fields, nestedDots, fieldDefinition, path + ".selection")
      let values = (<SelectableSectionFieldDefinition>fieldDefinition).selections.map(selection => (selection.value ? selection.value : selection.label));
      let index = values.indexOf(get(this.value, path + ".selection"));
      const selection = (<SelectableSectionFieldDefinition>fieldDefinition).selections[index]
      if (selection) {
        for (let field of selection.form.fields) {
          this.addFields(fields, nestedDots, field, path + ".value")
        }
      }
      dots.push(html`<div class="fieldset">${nestedDots}</div>`)
    } else {
      if (fieldDefinition.hasOwnProperty('form')) {
        fieldDefinition = (<NestedFormDefinition>fieldDefinition).form
      }
      if (fieldDefinition.hasOwnProperty('fields')) {
        for (let field of (<FormDefinition>fieldDefinition).fields) {
          this.addFields(fields, nestedDots, field, path)
        }
        dots.push(html`<div class="fieldset">${nestedDots}</div>`)
      } else {
        const component = this.components[fieldDefinition.type]
        if (component && component.focusable) {
          this.addField(fields, dots, fieldDefinition, path)
        }
      }
    }
  }

  private addField(fields: FieldInfo[], dots: TemplateResult[], fieldDefinition: FieldDefinition, path: string) {
    const focused = this.focusedPath == path
    const filled = !!get(this.value, path)
    fields.push({ filled, required: (<InputFieldDefinition>fieldDefinition).required, path, focused })
    dots.push(html`<div class="${classMap({ dot: true, filled: filled && !this._errors, invalid: this._errors && !!this._errors.get(path), required: (<InputFieldDefinition>fieldDefinition).required, focused })}" title="${fieldDefinition.label ? fieldDefinition.label : fieldDefinition.name}" @click="${(e: Event) => { console.log("Dot path=" + path); this.dispatchEvent(new CustomEvent('focusField', { detail: path })) }}"></div>`)
  }
}
register("formsey-form-navigator", FormNavigator)