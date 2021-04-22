import { ListFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-list/mwc-list-item";
import { Select } from "@material/mwc-select";
import "@material/mwc-select/mwc-select";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-list-material")
export class ListField extends InputField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("mwc-select")
  mwcSelect: Select | undefined

  renderField(customValidity?: string) {
    if (!this.definition) return
    return html`<mwc-select label="${ifDefined(this.definition.label)}" helper="${ifDefined(this.definition.helpText)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" validationmessage="${ifDefined(customValidity)}" @selected="${this.changed}" @invalid="${this.invalid}" name="${ifDefined(this.definition.name)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}">
    ${this.definition.options.map(item => html`<mwc-list-item ?selected="${item.value ? item.value == this.value : item.label == this.value}" value="${item.value ? item.value : item.label}">${item.label ? item.label : item.value}</mwc-list-item>`)}
    </mwc-select>`;
  }

  inputField() {
    return this.mwcSelect!
  }
}

getLibrary("material").registerComponent("list", {
  importPath: "@formsey/fields-material/ListField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-list-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-list-material>`
  }
})