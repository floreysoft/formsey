import { DateFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';


@customElement("formsey-date-material")
export class DateField extends InputField<DateFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("mwc-textfield")
  mwcTextField: TextField | undefined

  renderField(customValidity: string) {
    if (!this.definition) return
    return html`<mwc-textfield label="${ifDefined(this.definition.label)}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" validationmessage="${ifDefined(customValidity)}"  @change="${this.changed}" @input="${this.inputted}" @invalid="${this.invalid}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined(this.definition.placeholder)}" min="${ifDefined(this.definition.max)}" max="${ifDefined(this.definition.max)}"  step="${ifDefined(this.definition.step)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}" ></mwc-textfield>`;
  }

  inputField() {
    return this.mwcTextField!
  }

  protected get type(): TextFieldType {
    return "date"
  }
}

getLibrary("material").registerComponent("date", {
  importPath: "@formsey/fields-material/DateField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-date-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date-material>`
  }
})