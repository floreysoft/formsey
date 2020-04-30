import '@vaadin/vaadin-date-picker';
import { DateFieldDefinition } from '@formsey/core';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';
import { VaadinDatePicker } from "@vaadin/vaadin-date-picker";
import { InvalidEvent, InvalidError } from '@formsey/core/InvalidEvent';

@customElement("formsey-date-vaadin")
export class DateField extends VaadinField<DateFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-date-picker")
  vaadinDatePicker: VaadinDatePicker

  renderField() {
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-date-picker style="display:flex" label="${ifDefined(this.definition.label)}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" ?disabled="${ifDefined(this.definition.disabled)}" ?autofocus="${this.definition.autofocus}" @change="${this.changed}" min="${ifDefined(this.definition.min)}"  max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinDatePicker.validate() : this.vaadinDatePicker.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinDatePicker.errorMessage, false, { ...this.vaadinDatePicker.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}