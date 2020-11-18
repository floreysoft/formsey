import { BooleanFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { MaterialField } from './MaterialField';

@customElement("formsey-checkbox-material")
export class CheckboxField extends MaterialField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("mwc-checkbox")
  materialCheckbox: Checkbox

  renderField() {
    return html`<mwc-formfield label="${this.definition.label}"><mwc-checkbox @change="${(event) => this.changed(event)}" .indeterminate="${this.definition.indeterminate}" ?disabled="${this.definition.disabled}" ?checked="${this.value}"></mwc-checkbox></mwc-formfield>`;
  }

  focusField(path: string) {
    this.materialCheckbox.focus()
    return true
  }

  public validate(report: boolean) {
    let valid = !this.definition.required || this.materialCheckbox.checked
    if (!valid) {
      let errors: InvalidErrors = new InvalidErrors()
      errors.set(this.definition.name, {
        "validityMessage": this.definition.customValidity ? this.definition.customValidity : "Please check this box if you want to proceed", "validityState": {
          "valueMissing": true
        }
      })
      this.dispatchEvent(new InvalidEvent(errors))
    }
    return valid
  }

  protected changed(e: any) {
    this.value = this.materialCheckbox.checked
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
  }
}

getLibrary("material").registerComponent("checkbox", {
  importPath: "@formsey/fields-material/CheckboxField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-checkbox-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox-material>`
  }
})