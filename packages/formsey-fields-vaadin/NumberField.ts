import { NumberFieldDefinition, register } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { VaadinNumberField } from '@vaadin/vaadin-text-field';
import "@vaadin/vaadin-text-field/vaadin-number-field.js";
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

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
    return html`<vaadin-number-field style="display:flex;width:100%" label="${ifDefined(this.definition.label)}" has-controls ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" ?autocomplete="${!!this.definition.autocomplete}" @change="${this.changed}" @input="${this.inputted}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" preventinvalidinput="true" .value="${this.value? this.value : ''}">`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinNumberField.focus()
    }
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
register("formsey-number-vaadin", NumberField, "vaadin", "number",{ importPath: "@formsey/fields-vaadin/NumberField"})