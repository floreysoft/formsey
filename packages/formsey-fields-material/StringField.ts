import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { Field, StringFieldDefinition, LabeledField } from '@formsey/core';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-string-material")
export class StringField extends LabeledField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  materialTextField : TextField

  renderField() {
    return html`<mwc-textfield style="display:flex" fullwidth="true" helper="${this.definition.helpText}" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}"></mwc-textfield>`;
  }

  checkValidity() {
    let valid = this.materialTextField.checkValidity() as boolean
    if ( !valid ) {
      this.dispatchEvent(new InvalidEvent(this.definition.name, "valueMissing"))
    }
    return valid;
  }
}