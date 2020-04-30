import { ListFieldDefinition, ChangeEvent } from '@formsey/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { customElement, html, property, query } from 'lit-element';
import { VaadinField } from './VaadinField';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-list-vaadin")
export class ListField extends VaadinField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-combo-box")
  comboBox : ComboBoxElement

  renderField() {
    return html`<vaadin-combo-box style="display:flex" @change="${event => this.changed(event)}" label="${ifDefined(this.definition.label)}" ?disabled="${this.definition.disabled}" name="${this.definition.name}" .items="${this.definition.options}" .value="${this.value}"></vaadin-combo-box>`;
  }

  firstUpdated() {
    this.comboBox.itemValuePath = "value"
    this.comboBox.itemLabelPath = "label"
  }

  updated(changedProperties : Object) {
    if ( changedProperties.hasOwnProperty('definition') ) {
      this.comboBox.items = this.definition.options
    }
  }

  protected changed(e: any) {
    this.value = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }
}