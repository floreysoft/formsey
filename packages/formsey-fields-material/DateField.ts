import { DateFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { InputField } from './InputField';

@customElement("formsey-date-material")
export class DateField extends InputField<DateFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  mwcTextField: TextField

  renderField(customValidity : string) {
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}"  @change="${this.changed}" @input="${this.inputted}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" min="${ifDefined(this.definition.max)}" max="${ifDefined(this.definition.max)}"  step="${ifDefined(this.definition.step)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}" ></mwc-textfield>`;
  }

  inputField() {
    return this.mwcTextField
  }

  protected get type() : TextFieldType {
    return "date"
  }
}

getLibrary("material").registerComponent("date", {
  importPath: "@formsey/fields-material/DateField",
    factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-date-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date-material>`
  }
})