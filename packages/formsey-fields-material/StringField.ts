import { Field, StringFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { css, customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined.js';
@customElement("formsey-string-material")
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
    const customValidity = this.errors.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" maxlength="${ifDefined(this.definition.maxlength)}" pattern="${ifDefined(this.definition.pattern)}" ?disabled="${this.definition.disabled}" .value="${this.value && this.value.length > 0 ? this.value : ''}" ?charCounter="${!!this.definition.maxlength}"></mwc-textfield>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.materialTextField.focus()
    }
  }

  firstUpdated() {
    this.materialTextField.validityTransform = (newValue, nativeValidity) => {
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
    this.errors.set(this.path(), new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected get type() : TextFieldType {
    return "text"
  }
}

getLibrary("material").registerComponent("string", {
  importPath: "@formsey/fields-material/StringField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-string-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string-material>`
  }
})