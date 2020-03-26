import { BooleanFieldDefinition, LabeledField, ValueChangedEvent } from '@formsey/core';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox.js";
import { customElement, html, property, query } from 'lit-element';

@customElement("formsey-boolean-material")
export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("mwc-checkbox")
  materialCheckbox: Checkbox

  renderField() {
    return html`<mwc-checkbox @change="${(event) => this.valueChanged(event)}" .indeterminate="${this.definition.indeterminate}" ?disabled="${this.definition.disabled} ?checked="${this.value}"></mwc-checkbox>`;
  }

  protected valueChanged(e: any) {
    this.value = this.materialCheckbox.checked
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }
}