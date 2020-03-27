import { BooleanFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import { customElement, html, property, query } from 'lit-element';
import { MaterialField } from './MaterialField';

@customElement("formsey-boolean-material")
export class BooleanField extends MaterialField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("mwc-checkbox")
  materialCheckbox: Checkbox

  renderField() {
    return html`<mwc-formfield label="${this.definition.label ? this.definition.label : this.definition.prompt}"><mwc-checkbox @change="${(event) => this.valueChanged(event)}" .indeterminate="${this.definition.indeterminate}" ?disabled="${this.definition.disabled}" ?checked="${this.value}"></mwc-checkbox></mwc-formfield>`;
  }

  public validate(report: boolean) {
    let valid = !this.definition.required || this.materialCheckbox.checked
    if (!valid) {
      let errors: InvalidErrors = {}
      errors[this.definition.name] = {
        "validityMessage": this.definition.customValidity ? this.definition.customValidity : "Please check this box if you want to proceed", "validityState": {
          "valueMissing": true
        }
      }
      this.dispatchEvent(new InvalidEvent(errors))
    }
    return valid
  }

  protected valueChanged(e: any) {
    this.value = this.materialCheckbox.checked
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }
}