import { LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { VaadinTextField } from '@vaadin/vaadin-text-field';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-string-vaadin")
export class StringField extends LabeledField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinTextField: VaadinTextField

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-text-field style="display:flex" label="${this.definition.prompt}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${ifDefined(this.definition.disabled)}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${ifDefined(this.value)}">`;
  }

  renderHeader() {
    return
  }

  renderFooter() {
    return this.definition.helpText ? html`<div class="help-text">${this.definition.helpText}</div>` : undefined
  }

  validate() {
    let validity = this.vaadinTextField.checkValidity() as boolean
    if (!validity) {
      this.invalid()
    }
    return validity
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinTextField.validationMessage, false, { ...this.vaadinTextField.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}