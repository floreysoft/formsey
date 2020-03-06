import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { customElement, html, property, query } from 'lit-element';
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

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input type="text" ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" pattern="${ifDefined(this.definition.pattern)}" minlength="${ifDefined(this.definition.minlength)}" maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}">`
  }

  validate(report : boolean) {
    return this.input.checkValidity() as boolean
  }

  invalid() {
    let validityState = {}
    for ( let key in this.input.validity ) {
      if ( this.input.validity[key] ) {
        validityState[key] = this.input.validity[key]
      }
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(this.input.validationMessage, false, validityState )
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}