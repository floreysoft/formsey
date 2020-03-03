import { Field, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent, InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from 'lit-element';

@customElement("formsey-string")
export class StringField extends Field<StringFieldDefinition, string> {
  @property({ converter: Object })
  definition: StringFieldDefinition;

  @property({ type: String })
  value: string;

  @query("input")
  input : HTMLInputElement

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input type="text" ?required="${this.definition.required}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${this.definition.placeholder}" .value="${this.value}">`
  }

  checkValidity() {
    return this.input.checkValidity() as boolean
  }

  invalid() {
    let validityState : ValidityState = this.input.validity
    let errors: InvalidErrors = {}
    errors[this.definition.name] = new InvalidError("invalidInput", validityState)
    this.dispatchEvent(new InvalidEvent(errors))
  }
}