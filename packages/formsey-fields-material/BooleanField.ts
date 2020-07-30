import { BooleanFieldDefinition, register, ValueChangedEvent } from '@formsey/core';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import { html, property, query } from 'lit-element';
import { MaterialField } from './MaterialField';

export class BooleanField extends MaterialField<BooleanFieldDefinition, boolean> {
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
register("formsey-boolean-material", BooleanField, "material", "boolean", { importPath: "@formsey/fields-material/BooleanField"});