import { InputFieldDefinition, LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { INPUT_STYLE } from './styles';

export class InputField<T extends InputFieldDefinition> extends LabeledField<T, string> {
  @property({ converter: Object })
  set definition(definition: T) {
    this.autofocus = definition.autofocus
    this._definition = definition
  }

  get definition() {
    return this._definition
  }

  @property({ type: String })
  value: string;

  @property({ type: Boolean, reflect: true })
  autofocus: boolean;

  @query("#input")
  input: HTMLInputElement

  private _definition: T

  static get styles() {
    return [...super.styles, INPUT_STYLE]
  }

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    return html`<input id="input" class="input" type="${this.type}" ?autofocus=${this.definition.autofocus} ?readonly=${this.definition.readonly} ?disabled=${this.definition.disabled} ?required="${this.definition.required}" @input="${this.inputted}" @change="${this.changed}" @blur="${this.blurred}" @focus="${this.focused}" @invalid="${this.invalid}" name="${this.path()}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}" .value="${this.value ? this.value : ''}">`
  }

  focusField() {
    this.input.focus()
  }

  focus() {
    this.input.focus()
  }

  validate(report: boolean) {
    this.input.setCustomValidity("")
    if (this.error?.custom) {
      this.dispatchEvent(new InvalidEvent(this.errors))
      return false;
    }
    return this.input.checkValidity() as boolean
  }

  invalid(e) {
    e.preventDefault()
    let validityState = {}
    for (let key in this.input.validity) {
      if (this.input.validity[key]) {
        validityState[key] = this.input.validity[key]
      }
    }
    if (this.definition.customValidity && !this.input.validity.valid) {
      this.input.setCustomValidity(this.definition.customValidity)
    }
    this.errors.set(this.definition.name, this.error ? this.error : new InvalidError(this.input.validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected get type(): "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "submit" | "image" | "reset" | "button" {
    return "text"
  }
}