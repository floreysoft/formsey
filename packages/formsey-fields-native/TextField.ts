import { LabeledField, register, StringFieldDefinition, TextFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class TextField extends LabeledField<TextFieldDefinition, string> {
  public static formAssociated = true;

  @property({ type: String })
  value: string;

  @query("textarea")
  textArea : HTMLTextAreaElement

  protected internals: any

  static get styles() {
    return [...super.styles, css`
    textarea {
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid var(--formsey-input-border-color, #d5d5d5);
      padding: var(--formsey-input-padding, 8px);
      outline: none;
      user-select: auto;
      resize: vertical;
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

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<textarea ?autofocus=${ifDefined(this.definition.autofocus)} ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}">${ifDefined(this.value)}</textarea>`
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