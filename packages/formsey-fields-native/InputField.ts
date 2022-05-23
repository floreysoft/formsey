import { InputFieldDefinition, LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

export class InputField<T extends InputFieldDefinition, V> extends LabeledField<T, V> {
  @property({ type: String })
  value: any;

  @query("#input")
  input: HTMLInputElement | undefined

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    if (this.definition) {
      return html`<input id="input" class="${this.inputClassName}" type="${this.type}" ?autofocus=${this.definition.autofocus} ?readonly=${this.definition.readonly} ?disabled=${this.definition.disabled} ?required="${this.definition.required}" @input=${this.inputted} @change=${this.changed} @blur="${this.blurred}" @focus="${this.focused}" @invalid="${this.invalid}" name="${this.path()}" aria-labelledby=${this.elementId} placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}" .value="${typeof this.value == "undefined" ? '' : this.value}">`
    }
  }

  focusField() {
    this.input?.focus()
    return true
  }

  focus() {
    this.input?.focus()
  }

  validate(report: boolean) {
    if (this.input) {
      this.input.setCustomValidity("")
      return this.input.checkValidity()
    } else {
      return true
    }
  }

  invalid(e: Event) {
    e.preventDefault()
    let validityState: { [key: string]: any } = {}
    if (this.definition && this.input) {
      for (let key in this.input.validity) {
        if ((<any>this.input.validity)[key]) {
          validityState[key] = (<any>this.input.validity)[key]
        }
      }
      if (this.definition.customValidity && !this.input.validity.valid) {
        this.input.setCustomValidity(this.definition.customValidity)
      }
      this.errors = this.errors || new InvalidErrors()
      this.errors.set(this.path(), new InvalidError(this.input.validationMessage, false, validityState))
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }

  protected get type(): "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "submit" | "image" | "reset" | "button" {
    return "text"
  }

  protected get inputClassName() {
    return "input"
  }
}