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
    return html`<vaadin-text-field style="display:flex" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(this.errorMessage)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}">`;
  }

  renderFooter() {
    return
  }

  validate() {
    let validity = this.vaadinTextField.validate() as boolean
    if (!validity) {
      this.errors[this.definition.name] = new InvalidError("invalidInput", false, this.vaadinTextField.validity)
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
    return validity
  }
}