import { StringFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputField } from './InputField';

@customElement("formsey-string-material")
export class StringField extends InputField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("mwc-textfield")
  mwcTextField: TextField | undefined

  renderField(customValidity?: string) {
    if (!this.definition) return
    return html`<mwc-textfield label="${ifDefined(this.definition.label)}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" validationmessage="${ifDefined(customValidity)}" @change="${this.changed}" @input="${this.inputted}" @invalid="${this.invalid}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined(this.definition.placeholder)}" maxlength="${ifDefined(this.definition.maxlength)}" pattern="${ifDefined(this.definition.pattern)}" ?disabled="${this.definition.disabled}" .value="${this.value && this.value.length > 0 ? this.value : ''}" ?charCounter="${!!this.definition.maxlength}"></mwc-textfield>`;
  }

  inputField() {
    return this.mwcTextField!
  }

  protected get type(): TextFieldType {
    return "text"
  }
}

getLibrary("material").registerComponent("string", {
  importPath: "@formsey/fields-material/StringField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-string-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-string-material>`
  }
})