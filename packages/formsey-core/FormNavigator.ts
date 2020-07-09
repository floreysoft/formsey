import { html, LitElement, property, query, TemplateResult, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { FieldDefinition, register, InputFieldDefinition } from ".";
import { FormDefinition } from "../formsey";
import { InvalidError, InvalidErrors } from "./InvalidEvent";
import { get } from "./Form";

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

  private _errors : InvalidErrors
  private _errorsArray: [string, InvalidError][]
  private focusedError: number = -1

  static get styles() {
    return css`
    .dots {
      display: flex;
      flex-direction: row;
      padding: .2em;
      overflow-x: auto;
      scrollbar-width: none;
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
      background-color: #d5d5d5;
      margin: .1em;
      border: 1px solid transparent;
      transition: all .2s ease-out;
      transform: scale(.5);
    }
    .focused {
      transform: scale(1);
      border: 1px solid var(--formsey-primary-color);
    }
    .required {
      background-color: blue;
    }
    .invalid {
      background-color: red;
    }
    .filled {
      background-color: green;
    }
    `
  }

  render() {
    console.log("Focused path="+this.focusedPath)
    let dots: TemplateResult[] = []
    if (this.definition) {
      this.addDots(dots, this.definition)
    }
    let errors = this._errorsArray ?
      html`${this._errorsArray.length} errors <button id="prev" disabled @click="${e => { this.focusError(this.focusedError - 1) }}">Prev</button><button id="next" @click="${e => { this.focusError(this.focusedError + 1) }}">Next</button>` :
      html`No errors`
    return html`<div class="dots">${dots}<div class="errors">${errors}</div></div>`
  }

  updated() {
    if (this.focused) {
      // this.focused.scrollIntoView()
    }
  }

  focusError(index: number) {
    this.focusedError = index
    this.previous.disabled = index == 0
    this.next.disabled = index == this._errorsArray.length - 1
    this.dispatchEvent(new CustomEvent('focusField', { detail: this._errorsArray[index][0] }))
  }

  private addDots(dots: TemplateResult[], fieldDefinition: FieldDefinition, path?: string) {
    path = path ? path + "." + fieldDefinition.name : fieldDefinition.name
    if (fieldDefinition.hasOwnProperty('fields')) {
      for (let field of (<FormDefinition>fieldDefinition).fields) {
        this.addDots(dots, field, path)
      }
    } else {
      dots.push(html`<div class="${classMap({ dot: true, filled: !!get(this.value, path), invalid: this._errors && !!this._errors.get(path), required: (<InputFieldDefinition>fieldDefinition).required, focused: this.focusedPath == path })}" title="${fieldDefinition.name}" @click="${(e: Event) => { console.log("Dot path="+path); this.dispatchEvent(new CustomEvent('focusField', { detail: path })) }}"></div>`)
    }
  }
}
register("formsey-form-navigator", FormNavigator)