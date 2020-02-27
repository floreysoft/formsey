import { LabeledField, ListFieldDefinition, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html, property, customElement } from 'lit-element';

@customElement("formsey-list-vaadin")
export class ListField extends LabeledField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  renderField() {
    return html`<vaadin-combo-box style="display:flex" @change="${event => this.valueChanged(event)}" name="${this.definition.name}" .items="${this.definition.options}" .value="${this.value}">
    <template>
    [[item.label]]
    </template>
    </vaadin-combo-box>`;
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}