import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { customElement, html, property, query, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';

@customElement("formsey-string")
export class StringField extends LabeledField<StringFieldDefinition, string> {
  @property({ converter: Object })
  definition: StringFieldDefinition;

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
      border: var(--formsey-input-border, 1px solid -s#d5d5d5);
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
    return html`<input type="text" ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" pattern="${ifDefined(this.definition.pattern)}" minlength="${ifDefined(this.definition.minlength)}" maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}">`
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
}