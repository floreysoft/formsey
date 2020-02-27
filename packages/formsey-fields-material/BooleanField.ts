import { BooleanFieldDefinition, LabeledField } from '@formsey/core';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { customElement, html, property } from 'lit-element';

@customElement("formsey-boolean-material")
export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  renderField() {
    return html`<mwc-checkbox @click="${(event) => this.valueChanged(event)}" .indeterminate="${this.definition.indeterminate}" .value="${this.value}"></mwc-checkbox>`;
  }
}