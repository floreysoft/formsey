import { Field, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from 'lit-element';

@customElement("formsey-string")
export class StringField extends Field<StringFieldDefinition, string> {
  @property({ converter: Object })
  definition: StringFieldDefinition;

  @property({ type: String })
  value: string;

  @query("input")
  input : HTMLInputElement

  public checkValidity(): boolean {
    let validityState = this.input.validity as ValidityState
    if ( validityState.valueMissing ) {
      this.dispatchEvent(new InvalidEvent([new InvalidError(this.definition.name, "valueMissing")]))
    }
    return this.input.checkValidity()
  }

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input type="text" ?required="${this.definition.required}" @keyup="${this.valueChanged}" name="${this.definition.name}" placeholder="${this.definition.placeholder}" .value="${this.value}">`
  }
}