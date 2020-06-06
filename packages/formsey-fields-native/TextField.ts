import { LabeledField, register, StringFieldDefinition, TextFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { INPUT_STYLE } from './styles';

export class TextField extends LabeledField<TextFieldDefinition, string> {
  public static formAssociated = true;

  @property({ type: String })
  value: string;

  @query("textarea")
  textArea : HTMLTextAreaElement

  protected internals: any

  static get styles() {
    return [...super.styles, INPUT_STYLE, css`
    .input {
      height: auto;
    }`]
  }

  constructor() {
    super()
    // @ts-ignore
    this.internals = this.attachInternals();
  }

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    return html`<textarea class="input" rows="3" ?autofocus=${ifDefined(this.definition.autofocus)} ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}">${ifDefined(this.value)}</textarea>`
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
register("formsey-text", TextField)