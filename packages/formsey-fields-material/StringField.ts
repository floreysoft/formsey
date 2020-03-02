import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidEvent, InvalidError } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-string-material")
export class StringField extends LabeledField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  materialTextField : TextField

  renderHeader() {
    return html`${this.definition.prompt ? html`<div class="prompt">${this.definition.prompt}${this.definition.required ? html`<span class="required">*</span>` : html``}</div>` : html``}`
  }

  renderField() {
    return html`<mwc-textfield fullwidth="true" helper="${this.definition.helpText ? this.definition.helpText : ''}" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}"></mwc-textfield>`;
  }

  checkValidity() {
    let valid = this.materialTextField.checkValidity() as boolean
    if ( !valid ) {
      this.dispatchEvent(new InvalidEvent([new InvalidError(this.definition.name, "valueMissing")]))
    }
    return valid;
  }
}