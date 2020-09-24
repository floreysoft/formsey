import { KEYCODE } from '@floreysoft/utils';
import { LabeledField, register, StringFieldDefinition, TextFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class TextField extends LabeledField<TextFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("textarea")
  textArea: HTMLTextAreaElement

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    return html`<textarea class="input" rows="3" ?autofocus=${this.definition.autofocus} ?disabled=${this.definition.disabled} ?required="${this.definition.required}" draggable="true"
    @dragstart="${e => { e.preventDefault(); e.stopPropagation() }}" @keydown="${this.keyDown}" @input="${this.inputted}" @change="${this.changed}" @blur="${this.blurred}" @focus="${this.focused}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${this.definition.autocomplete}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}" .value="${this.value || ''}"></textarea>`
  }

  focusField() {
    this.textArea.focus()
    return true
  }

  validate(report: boolean) {
    this.textArea.setCustomValidity("")
    return this.textArea.checkValidity() as boolean
  }

  invalid() {
    let validityState = {}
    for (let key in this.textArea.validity) {
      if (this.textArea.validity[key]) {
        validityState[key] = this.textArea.validity[key]
      }
    }
    if (this.definition.customValidity && !this.textArea.validity.valid) {
      this.textArea.setCustomValidity(this.definition.customValidity)
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(this.textArea.validationMessage, false, validityState)
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
        case KEYCODE.RETURN:
        case KEYCODE.LEFT:
        case KEYCODE.RIGHT:
            e.stopPropagation()

    }
  }
}
register("formsey-text", TextField, "native", "text", { importPath: "@formsey/fields-native/TextField" })