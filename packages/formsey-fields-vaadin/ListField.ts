import { ListFieldDefinition, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { customElement, html, property } from 'lit-element';
import { VaadinField } from './VaadinField';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-list-vaadin")
export class ListField extends VaadinField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  renderField() {
    return html`<vaadin-combo-box style="display:flex" @change="${event => this.valueChanged(event)}" label="${ifDefined(this.definition.prompt)}" ?disabled="${this.definition.disabled}" name="${this.definition.name}" .items="${this.definition.options}" .value="${this.value}">
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