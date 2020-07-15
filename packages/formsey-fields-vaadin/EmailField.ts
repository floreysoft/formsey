import "@vaadin/vaadin-text-field/vaadin-email-field";
import { StringFieldDefinition, register } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { EmailFieldElement } from '@vaadin/vaadin-text-field/vaadin-email-field';
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

export class EmailField extends VaadinField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-email-field")
  vaadinEmailField: EmailFieldElement

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-email-field style="display:flex" label="${ifDefined(this.definition.label)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-email-field>`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinEmailField.focus()
    }
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
register("formsey-email-vaadin", EmailField, "vaadin", "email", { importPath: "@formsey/fields-vaadin/EmailField"})