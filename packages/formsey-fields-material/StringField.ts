import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-string-material")
export class StringField extends LabeledField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  materialTextField: TextField

  renderHeader() {
    return html`${this.definition.prompt ? html`<div class="prompt">${this.definition.prompt}${this.definition.required ? html`<span class="required">*</span>` : html``}</div>` : html``}`
  }

  renderField() {
    return html`<mwc-textfield fullwidth="true" helper="${this.definition.helpText ? this.definition.helpText : ''}" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" validationmessage="${ifDefined(this.errorMessage)}" @input="${this.valueChanged}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}"></mwc-textfield>`;
  }

  renderFooter() {
    return;
  }

  firstUpdated() {
    this.materialTextField.validityTransform = (newValue, nativeValidity) => {
      if (this.errors[this.definition.name] && this.errors[this.definition.name].customError ) {
        return {
          valid: false,
          errorMessage: this.errors[this.definition.name].errorMessage,
          ...this.errors[this.definition.name].details
        };
      }
      return nativeValidity;
    }
  }

  validate() {
    return this.materialTextField.reportValidity() as boolean
  }

  invalid() {
    let validityState: ValidityState = this.materialTextField.validity
    for (let key in validityState) {
      if (!validityState[key]) {
        delete validityState[key]
      }
    }
    let errorMessage = "invalidInput"
    let customError = false
    if ( validityState['errorMessage'] ) {
      errorMessage = validityState['errorMessage']
      delete validityState['errorMessage']
      customError = true
    }
    this.errors[this.definition.name] = new InvalidError(errorMessage, customError, validityState)
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}