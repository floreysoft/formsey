import { BooleanFieldDefinition, LabeledField, ValueChangedEvent } from '@formsey/core';
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { css, customElement, html, property, query } from 'lit-element';

@customElement("formsey-boolean-vaadin")
export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("vaadin-checkbox")
  private checkbox: CheckboxElement;

  static get styles() {
    return [...super.styles, css`
    vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }`]
  }

  renderField() {
    return html`<vaadin-checkbox @change="${(event) => this.valueChanged(event)}" .indeterminate="${this.definition.indeterminate}" .checked=${this.value}>${this.definition.label}</vaadin-checkbox>`;
  }

  protected valueChanged(e: any) {
    this.value = this.checkbox.checked;
    if ( this.definition.name ) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}