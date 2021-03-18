import { Field } from '@formsey/core';
import { InputFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { SelectBase } from '@material/mwc-select/mwc-select-base';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from '@material/mwc-textfield/mwc-textfield.js';
import { TemplateResult } from "lit";


export abstract class InputField<T extends InputFieldDefinition, V> extends Field<T, V> {
  value: V | undefined

  render() {
    const customValidity = this.errors?.get(this.path())?.validityMessage || this.definition?.customValidity
    return this.renderField(customValidity)
  }

  abstract renderField(customValidity?: string): TemplateResult | undefined

  abstract inputField(): TextField | SelectBase

  focusField(path: string) {
    if (path == this.path()) {
      this.inputField().focus()
    }
  }

  firstUpdated() {
    const inputField = this.inputField()
    inputField.validityTransform = (newValue, nativeValidity) => {
      this.errors = this.errors || new InvalidErrors()
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
      if (!(<any>validityState)[key]) {
        delete (<any>validityState)[key]
      }
    }
    let validationMessage = this.definition!.customValidity || (<any>inputField).formElement.validationMessage
    if ((<any>validityState)['validationMessage']) {
      validationMessage = (<any>validityState)['validationMessage']
      delete (<any>validityState)['validationMessage']
    }
    this.errors = this.errors || new InvalidErrors()
    this.errors.set(this.path(), new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}