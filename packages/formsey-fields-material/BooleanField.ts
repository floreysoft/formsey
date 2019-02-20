import "@material/mwc-checkbox/mwc-checkbox.js";
import { html, property } from 'lit-element';
import { Field, BooleanFieldDefinition } from '@formsey/core';

export class BooleanField extends Field<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  renderField() {
    return html`<mwc-checkbox @click="${(event) => this.valueChanged(event)}" .indeterminate="${this.definition.indeterminate}" .value="${this.value}"></mwc-checkbox>`;
  }
}

customElements.define('formsey-boolean', BooleanField);