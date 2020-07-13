import { html, LitElement, property, query, TemplateResult, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { FieldDefinition, register, InputFieldDefinition, NestedFormDefinition } from ".";
import { InvalidError, InvalidErrors } from "./InvalidEvent";
import { get } from "./Form";
import { FormDefinition } from "./FieldDefinitions";

export class FormNavigator extends LitElement {
  @property({ type: Object })
  definition: FieldDefinition

  @property({ type: Object })
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
  previous: HTMLButtonElement

  @query("#next")
  next: HTMLButtonElement

  @query(".focused")
  focused: HTMLElement

  private _errors: InvalidErrors
  private _errorsArray: [string, InvalidError][]
  private focusedError: number = -1

  static get styles() {
    return css`
    .dots {
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow-x: auto;
      scrollbar-width: none;
      line-height: 0;
    }
    .fieldset {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #00000011;
      border-radius: 2em;
      margin: 0 0.15em;
      padding: 1px 4px;
      line-height: 0;
    }
    .dots::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .dot {
      cursor: pointer;
      width: 1em;
      height: 1em;
      min-width: 1em;
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
    `
  }

  render() {
    let dots: TemplateResult[] = []
    if (this.definition) {
      this.addDots(dots, this.definition)
    }
    let errors = this._errorsArray ?
      html`${this._errorsArray.length} errors <button id="prev" disabled @click="${e => { this.focusError(this.focusedError - 1) }}">Prev</button><button id="next" @click="${e => { this.focusError(this.focusedError + 1) }}">Next</button>` :
      html`No errors`
    return html`<div class="dots">${dots}<div class="errors">${errors}</div></div>`
  }

  focusError(index: number) {
    this.focusedError = index
    this.previous.disabled = index == 0
    this.next.disabled = index == this._errorsArray.length - 1
    this.dispatchEvent(new CustomEvent('focusField', { detail: this._errorsArray[index][0] }))
  }

  private addDots(dots: TemplateResult[], fieldDefinition: FieldDefinition, path?: string) {
    path = path ? path + (fieldDefinition.name ? "." + fieldDefinition.name : '') : fieldDefinition.name
    let nestedDots: TemplateResult[] = []
    if (fieldDefinition.type == "repeatingSection") {
      fieldDefinition = (<NestedFormDefinition>fieldDefinition).form
      const sections = get(this.value, path)
      if (sections) {
        for (let i = 0; i < sections.length; i++) {
          this.addDots(nestedDots, fieldDefinition, path+"["+i+"]")
        }
      }
      dots.push(html`<div class="fieldset">${nestedDots}</div>`)
    } else {
      if (fieldDefinition.hasOwnProperty('form')) {
        fieldDefinition = (<NestedFormDefinition>fieldDefinition).form
      }
      if (fieldDefinition.hasOwnProperty('fields')) {
        for (let field of (<FormDefinition>fieldDefinition).fields) {
          this.addDots(nestedDots, field, path)
        }
        dots.push(html`<div class="fieldset">${nestedDots}</div>`)
      } else {
        // console.log("Dot path="+path+", value="+get(this.value, path))
        dots.push(html`<div class="${classMap({ dot: true, filled: !!get(this.value, path) && !this._errors, invalid: this._errors && !!this._errors.get(path), required: (<InputFieldDefinition>fieldDefinition).required, focused: this.focusedPath == path })}" title="${fieldDefinition.label ? fieldDefinition.label : fieldDefinition.name}" @click="${(e: Event) => { console.log("Dot path=" + path); this.dispatchEvent(new CustomEvent('focusField', { detail: path })) }}"></div>`)
      }
    }
  }
}
register("formsey-form-navigator", FormNavigator)