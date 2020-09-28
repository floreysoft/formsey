import { ListFieldDefinition, register, ValueChangedEvent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html } from "lit-element";
import { property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
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

register({
  type: "email",
  tag: "formsey-list-vaadin",
  constructor: ListField,
  libraries: ["vaadin" ],
  importPath: "@formsey/fields-vaadin/ListField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-list-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-list-vaadin>`
  }
})