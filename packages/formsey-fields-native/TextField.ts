import { LabeledField, register, StringFieldDefinition, TextFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class TextField extends LabeledField<TextFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("textarea")
  textArea : HTMLTextAreaElement

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    return html`<textarea class="input" rows="3" ?autofocus=${this.definition.autofocus} ?disabled=${this.definition.disabled} ?required="${this.definition.required}" @input="${this.inputted}" @change="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${this.definition.autocomplete}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}" .value="${this.value || ''}"></textarea>`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.textArea.focus()
    }
  }

  validate(report : boolean) {
    this.textArea.setCustomValidity("")
    return this.textArea.checkValidity() as boolean
  }

  invalid() {
    let validityState = {}
    for ( let key in this.textArea.validity ) {
      if ( this.textArea.validity[key] ) {
        validityState[key] = this.textArea.validity[key]
      }
    }
    if ( this.definition.customValidity && !this.textArea.validity.valid ) {
      this.textArea.setCustomValidity(this.definition.customValidity)
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(this.textArea.validationMessage, false, validityState )
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}
register("native", "text", "formsey-text", TextField)