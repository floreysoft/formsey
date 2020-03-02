import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textarea/mwc-textarea.js";
import { TextArea } from "@material/mwc-textarea/mwc-textarea.js";
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-text-material")
export class TextField extends LabeledField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textarea")
  materialTextArea : TextArea

  protected renderHeader() {
    return html`${this.definition.prompt ? html`<div class="prompt">${this.definition.prompt}${this.definition.required ? html`<span class="required">*</span>` : html``}</div>` : html``}`
  }

  renderField() {
    return html`<mwc-textarea fullwidth="true" helper="${this.definition.helpText ? this.definition.helpText : ''}" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}"></mwc-textarea>`;
  }

  checkValidity() {
    let valid = this.materialTextArea.checkValidity() as boolean
    if ( !valid ) {
      console.log("Material text field invalid, throwing event")
      this.dispatchEvent(new InvalidEvent([new InvalidError(this.definition.name, "valueMissing")]))
    }
    return valid;
  }
}