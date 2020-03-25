import { StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { TextFieldElement } from '@vaadin/vaadin-text-field';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

@customElement("formsey-string-vaadin")
export class StringField extends VaadinField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinTextField: TextFieldElement

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-text-field style="display:flex" label="${ifDefined(this.definition.prompt)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${ifDefined(this.definition.disabled)}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}">`;
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinTextField.validate() : this.vaadinTextField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinTextField.errorMessage, false, { ...this.vaadinTextField.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}