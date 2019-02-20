import { html, property, customElement } from 'lit-element';
import { Field, NumberFieldDefinition } from '@formsey/core';

@customElement("formsey-number")
export class NumberField extends Field<NumberFieldDefinition, Number> {
  @property({ type: Number })
  value: Number;

  renderField() {
    return html`<input type="number" @click="${(event) => this.valueChanged(event)}" name="${this.definition.name}" min="${this.definition.min}" max="${this.definition.max}" .value="${this.value}">`
  }
}