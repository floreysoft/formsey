import { ListFieldDefinition, register, ValueChangedEvent } from '@formsey/core';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

export class ListField extends VaadinField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-combo-box")
  comboBox : ComboBoxElement

  renderField() {
    return html`<vaadin-combo-box style="display:flex" @change="${event => this.inputted(event)}" label="${ifDefined(this.definition.label)}" ?disabled="${this.definition.disabled}" name="${this.definition.name}" .items="${this.definition.options}" .value="${this.value}"></vaadin-combo-box>`;
  }

  firstUpdated() {
    this.comboBox.itemValuePath = "value"
    this.comboBox.itemLabelPath = "label"
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.comboBox.focus()
    }
  }

  updated(changedProperties : Object) {
    if ( changedProperties.hasOwnProperty('definition') ) {
      this.comboBox.items = this.definition.options
    }
  }

  protected changed(e: any) {
    this.value = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
    }
  }
}
register("formsey-list-vaadin", ListField, "vaadin", "list", { importPath: "@formsey/fields-vaadin/ListField"})