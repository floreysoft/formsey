import { Field } from '@formsey/core';
import { InputFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { SelectBase } from '@material/mwc-select/mwc-select-base';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from '@material/mwc-textfield/mwc-textfield.js';
import { TemplateResult } from "lit-element";

export abstract class InputField<T extends InputFieldDefinition, V> extends Field<T, V> {
  value: V;

  render() {
    const customValidity = this.errors.get(this.path())?.validityMessage || this.definition.customValidity
    return this.renderField(customValidity)
  }

  abstract renderField(customValidity: string): TemplateResult

  abstract inputField(): TextField | SelectBase

  focusField(path: string) {
    if (path == this.path()) {
      this.inputField().focus()
    }
  }

  firstUpdated() {
    const inputField = this.inputField()
    inputField.validityTransform = (newValue, nativeValidity) => {
      const error = this.errors.get(this.path())
      if (error) {
        return {
          valid: false,
          validationMessage: error.validityMessage,
          ...error.validityState
        }
      }
      return nativeValidity;
    }
  }

  validate(report: boolean) {
    if (report) {
      return this.inputField().reportValidity() as boolean
    } else {
      return this.inputField().checkValidity() as boolean
    }
  }

  invalid() {
    const inputField = this.inputField()
    let validityState: ValidityState = inputField.validity
    for (let key in validityState) {
      if (!validityState[key]) {
        delete validityState[key]
      }
    }
    let validationMessage = this.definition.customValidity || (<any>inputField).formElement.validationMessage
    if (validityState['validationMessage']) {
      validationMessage = validityState['validationMessage']
      delete validityState['validationMessage']
    }
    this.errors.set(this.path(), new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}