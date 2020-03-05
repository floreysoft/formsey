import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-string")
export class StringField extends LabeledField<StringFieldDefinition, string> {
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
    return html`<input type="text" ?required="${this.definition.required}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .value="${ifDefined(this.value)}">`
  }

  validate(report : boolean) {
    return this.input.checkValidity() as boolean
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.input.validationMessage, false, { ...this.input.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}