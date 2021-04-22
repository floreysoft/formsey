import { Field } from '@formsey/core/Field';
import { InputFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { TemplateResult } from 'lit';
import { query } from "lit/decorators.js";


export abstract class InputField<D extends InputFieldDefinition, V extends string> extends Field<D, V> {
  @query("vaadin-text-field")
  vaadinField: any

  render() {
    if (this.definition) {
      const customValidity = this.errors?.get(this.path())?.validityMessage || this.definition.customValidity
      return this.renderField(customValidity)
    }
  }

  abstract renderField(customValidity?: string) : TemplateResult | undefined

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.vaadinField.focus()
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinField.validate() : this.vaadinField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    let validityState : {[key: string] : string}= {}
    const validity = (this.vaadinField.focusElement as any).validity
    for (let key in validity) {
      if (validity[key]) {
        validityState[key] = validity[key]
      }
    }
    const validationMessage = this.vaadinField.errorMessage || (this.vaadinField.focusElement as any).validationMessage
    this.errors = this.errors || new InvalidErrors()
    this.errors.set(this.path(), new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}