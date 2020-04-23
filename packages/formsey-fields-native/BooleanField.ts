import { BooleanFieldDefinition, Field, register } from '@formsey/core';
import { html, property } from 'lit-element';

export class BooleanField extends Field<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  renderField() {
    return html`<input type="checkbox" @change="${(event) => this.valueChanged(event)}" .value="${this.value}"></vaadin-checkbox>`;
  }
}
register("formsey-boolean", BooleanField)