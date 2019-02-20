import { html, property, customElement } from 'lit-element';
import { Field, DateFieldDefinition } from '@formsey/core';

@customElement("formsey-date")
export class DateField extends Field<DateFieldDefinition, string> {
  @property({ type: String })
  value: string;

  renderField() {
    return html`<input type="datetime-local" @change="${(event) => this.valueChanged(event)}" name="${this.definition.name}" placeholder="${this.definition.placeholder}" .value="${this.value}">`;
  }
}