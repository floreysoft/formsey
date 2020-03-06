import { NumberFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { VaadinNumberField } from '@vaadin/vaadin-text-field';
import "@vaadin/vaadin-text-field/vaadin-number-field.js";
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from '.';

@customElement("formsey-number-vaadin")
export class NumberField extends VaadinField<NumberFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-number-field")
  vaadinNumberField: VaadinNumberField

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-number-field style="display:flex" label="${this.definition.prompt}" has-controls ?autofocus="${this.definition.autofocus}" ?required="${ifDefined(this.definition.required)}" ?autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" error-message="${ifDefined(customValidity)}" ?disabled="${ifDefined(this.definition.disabled)}" preventinvalidinput="true" .value="${ifDefined(this.value)}">`
  }

  validate() {
    let validity = this.vaadinNumberField.checkValidity() as boolean
    if (!validity) {
      this.invalid()
    }
    return validity
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinNumberField.validationMessage, false, { ...this.vaadinNumberField.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}