import { getLibrary, Resources } from '@formsey/core/Components';
import { Field } from '@formsey/core/Field';
import { ListFieldDefinition } from '@formsey/core/FieldDefinitions';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';


@customElement("formsey-list-vaadin")
export class ListField extends Field<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-combo-box")
  comboBox : ComboBoxElement

  render() {
    return html`<vaadin-combo-box style="display:flex" @change="${event => this.inputted(event)}" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" ?disabled="${this.definition.disabled}" name="${this.definition.name}" .items="${this.definition.options}" .value="${this.value}"></vaadin-combo-box>`;
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

getLibrary("vaadin").registerComponent("list", {
  importPath: "@formsey/fields-vaadin/ListField",
    factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<ListFieldDefinition, string> ) => {
    return html`<formsey-list-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-list-vaadin>`
  }
})