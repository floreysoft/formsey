import { NumberFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { InputField } from './InputField';
@customElement("formsey-number-material")
export class NumberField extends InputField<NumberFieldDefinition, number> {
  @property({ type: Number })
  value: number;

  @query("mwc-textfield")
  mwcTextField: TextField

  renderField(customValidity: string) {
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}"  @change="${this.changed}" @input="${this.inputted}" @invalid="${this.invalid}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value+'' : ''}"></mwc-textfield>`;
  }

  inputField() {
    return this.mwcTextField
  }

  protected get type() : TextFieldType {
    return "number"
  }

  protected changed(e: any) {
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
  }
}

getLibrary("material").registerComponent("number", {
  importPath: "@formsey/fields-material/NumberField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, number> ) => {
    return html`<formsey-number-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number-material>`
  }
})