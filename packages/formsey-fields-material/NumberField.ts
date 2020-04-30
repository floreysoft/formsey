import { Field, NumberFieldDefinition, ChangedEvent } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { css, customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-number-material")
export class NumberField extends Field<NumberFieldDefinition, number> {
  @property({ type: Number })
  value: number;

  @query("mwc-textfield")
  materialTextField: TextField

  static get styles() {
    return [...super.styles, css`
    mwc-textfield {
      width: 100%;
    }
  `]
  }

  renderField() {
    let customValidity = this.definition.customValidity
    if (this.error) {
      customValidity = this.error.validityMessage
    }
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}"></mwc-textfield>`;
  }

  firstUpdated() {
    this.materialTextField.validityTransform = (newValue, nativeValidity) => {
      if (this.error) {
        return {
          valid: false,
          validationMessage: this.error.validityMessage,
          ...this.error.validityState
        }
      }
      return nativeValidity;
    }
  }

  validate(report: boolean) {
    if (report) {
      return this.materialTextField.reportValidity() as boolean
    } else {
      return this.materialTextField.checkValidity() as boolean
    }
  }

  invalid() {
    let validityState: ValidityState = this.materialTextField.validity
    for (let key in validityState) {
      if (!validityState[key]) {
        delete validityState[key]
      }
    }
    let validationMessage = this.materialTextField.validationMessage
    if (validityState['validationMessage']) {
      validationMessage = validityState['validationMessage']
      delete validityState['validationMessage']
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(validationMessage, false, validityState)
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected get type() : TextFieldType {
    return "number"
  }

  protected changed(e: any) {
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new ChangedEvent(this.definition.name, this.value));
  }
}