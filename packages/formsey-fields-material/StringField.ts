import { Field, register, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { css, html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class StringField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  materialTextField: TextField

  static get styles() {
    return [...super.styles, css`
    mwc-textfield {
      width: 100%;
    }
  `]
  }

  render() {
    let customValidity = this.definition.customValidity
    if (this.error) {
      customValidity = this.error.validityMessage
    }
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" maxlength="${ifDefined(this.definition.maxlength)}" pattern="${ifDefined(this.definition.pattern)}" ?disabled="${this.definition.disabled}" .value="${this.value && this.value.length > 0 ? this.value : ''}" ?charCounter="${!!this.definition.maxlength}"></mwc-textfield>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.materialTextField.focus()
    }
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
    return "text"
  }
}
register("formsey-string-material", StringField, "material", "string", { importPath: "@formsey/fields-material/StringField"});