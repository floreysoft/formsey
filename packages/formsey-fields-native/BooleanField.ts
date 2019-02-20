import { html, property, customElement } from 'lit-element';
import { Field, BooleanFieldDefinition } from '@formsey/core';

@customElement("formsey-boolean")
export class BooleanField extends Field<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  renderField() {
    return html`<input type="checkbox" @change="${(event) => this.valueChanged(event)}" .value="${this.value}"></vaadin-checkbox>`;
  }
}