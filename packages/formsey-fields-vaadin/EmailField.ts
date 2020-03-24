import { StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { EmailFieldElement } from '@vaadin/vaadin-text-field/vaadin-email-field';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

@customElement("formsey-email-vaadin")
export class EmailField extends VaadinField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinEmailField: EmailFieldElement

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-email-field style="display:flex" label="${ifDefined(this.definition.prompt)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${ifDefined(this.definition.disabled)}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${ifDefined(this.value)}"></vaadin-email-field>`
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinEmailField.validate() : this.vaadinEmailField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinEmailField.errorMessage, false, { ...this.vaadinEmailField.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}