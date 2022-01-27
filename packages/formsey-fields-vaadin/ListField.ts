import { Field } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/Events';
import { ListFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ComboBox } from '@vaadin/combo-box';
import '@vaadin/combo-box';
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { createComparator } from '@formsey/fields-native';



@customElement("formsey-list-vaadin")
export class ListField extends Field<ListFieldDefinition, string> {
  @query("vaadin-combo-box")
  comboBox: ComboBox | undefined

  render() {
    if (this.definition) {
      return html`<vaadin-combo-box style="display:flex" @change="${(event: Event) => this.inputted(event)}" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" ?disabled="${this.definition.disabled}" name="${ifDefined(this.definition.name)}" .items="${this.definition.options}" .value="${this.value || ""}"></vaadin-combo-box>`;
    }
  }

  firstUpdated() {
    if (this.comboBox) {
      this.comboBox.itemValuePath = "value"
      this.comboBox.itemLabelPath = "label"
    }
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.comboBox?.focus()
    }
  }

  updated(changedProperties: Object) {
    if (this.comboBox && changedProperties.hasOwnProperty('definition')) {
      this.comboBox.items = this.definition?.options
    }
  }

  protected changed(e: any) {
    const isSame = createComparator(this.value)
    this.value = e.currentTarget.value;
    if (this.definition?.name) {
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
    }
  }
}

getLibrary("vaadin").registerComponent("list", {
  importPath: "@formsey/fields-vaadin/ListField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-list-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-list-vaadin>`
  }
})