import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent, InvalidErrors } from '@formsey/core/InvalidEvent';
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
    return html`<mwc-textarea fullwidth="true" helper="${this.definition.helpText ? this.definition.helpText : ''}" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}"></mwc-textarea>`;
  }

  checkValidity() {
    return this.materialTextArea.checkValidity() as boolean
  }

  invalid() {
    let validityState : ValidityState = this.materialTextArea.validity
    let errors: InvalidErrors = {}
    errors[this.definition.name] = new InvalidError("invalidInput", validityState)
    this.dispatchEvent(new InvalidEvent(errors))
  }
}