import { BooleanFieldDefinition, LabeledField, register } from '@formsey/core';
import { html, property, query } from 'lit-element';

export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("input")
  checkbox : HTMLInputElement

  renderField() {
    return html`<label><input type="checkbox" @change="${(event) => this.changed(event)}" .value="${this.value}" required="${this.definition.required}">${this.definition.label}</label>`;
  }

  firstUpdated() {
    this.checkbox.indeterminate = this.definition.indeterminate
  }
}
register("formsey-boolean", BooleanField)