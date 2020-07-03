import "@vaadin/vaadin-text-field/vaadin-text-area.js";
import { TextFieldDefinition, register } from '@formsey/core';
import { VaadinTextArea } from '@vaadin/vaadin-text-field';
import { html, property, query } from 'lit-element';
import { ifDefined } from "lit-html/directives/if-defined";
import { VaadinField } from './VaadinField';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';

export class TextField extends VaadinField<TextFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-area")
  vaadinTextArea: VaadinTextArea

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-text-area style="display:flex" label="${ifDefined(this.definition.label)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-text-area>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinTextArea.focus()
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinTextArea.validate() : this.vaadinTextArea.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinTextArea.errorMessage, false, { ...this.vaadinTextArea.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

}
register("formsey-text-vaadin", TextField, "vaadin", "text", "@formsey/fields-vaadin/TextField")