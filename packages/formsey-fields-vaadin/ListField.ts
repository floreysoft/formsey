import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html, property } from 'lit-element';
import { Field, ValueChangedEvent, ListFieldDefinition } from '@formsey/core';


export class ListField extends Field<ListFieldDefinition, string> {
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

customElements.define('formsey-list', ListField);