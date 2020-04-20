import { InputFieldDefinition, LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class InputField<T extends InputFieldDefinition> extends LabeledField<T, string> {
  @property({ converter: Object })
  definition: T;

  @property({ type: String })
  value: string;

  @query("input")
  input : HTMLInputElement

  static get styles() {
    return [...super.styles, css`
    input {
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid var(--formsey-input-border-color, #d5d5d5);
      padding: var(--formsey-input-padding, 8px);
      outline: none;
      user-select: auto;
    }`]
  }

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input type="${this.type}" ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}"  .value="${ifDefined(this.value)}">`
  }

  validate(report : boolean) {
    this.input.setCustomValidity("")
    return this.input.checkValidity() as boolean
  }

  invalid() {
    let validityState = {}
    for ( let key in this.input.validity ) {
      if ( this.input.validity[key] ) {
        validityState[key] = this.input.validity[key]
      }
    }
    if ( this.definition.customValidity && !this.input.validity.valid ) {
      this.input.setCustomValidity(this.definition.customValidity)
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(this.input.validationMessage, false, validityState )
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected get type() : string {
    return "text"
  }
}