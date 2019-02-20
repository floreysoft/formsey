import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { customElement, html, property, query } from 'lit-element';
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import { Field, ValueChangedEvent, BooleanFieldDefinition } from '@formsey/core';

@customElement("formsey-boolean")
export class BooleanField extends Field<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("vaadin-checkbox")
  private checkbox: CheckboxElement;

  renderStyles() {
    return `vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }`
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