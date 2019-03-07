import { html, property, customElement } from 'lit-element';
import { Field, StringFieldDefinition } from '@formsey/core';

@customElement("formsey-string")
export class StringField extends Field<StringFieldDefinition, string> {
  @property({ converter: Object })
  definition: StringFieldDefinition;

  @property({ type: String })
  value: string;

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input type="text" @keyup="${(event) => this.valueChanged(event)}" name="${this.definition.name}" placeholder="${this.definition.placeholder}" .value="${this.value}">`
  }
}