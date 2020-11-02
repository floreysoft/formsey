import { Field } from '@formsey/core/Field';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { TextFieldElement } from '@vaadin/vaadin-text-field';
import { property, query } from "lit-element";

export abstract class InputField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinField: TextFieldElement

  render() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return this.renderField(customValidity)
  }

  abstract renderField(customValidity : string)

  validate(report: boolean) {
    this.valid = report ? this.vaadinField.validate() : this.vaadinField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    let validityState = {}
    const validity = (this.vaadinField.focusElement as any).validity
    for (let key in validity) {
      if (validity[key]) {
        validityState[key] = validity[key]
      }
    }
    const validationMessage = this.vaadinField.errorMessage || (this.vaadinField.focusElement as any).validationMessage
    this.errors.set(this.definition.name, this.error ? this.error : new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}