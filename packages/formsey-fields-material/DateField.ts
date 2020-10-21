import { DateFieldDefinition, Field, registerComponent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField, TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { css, html } from "lit-element";
import { property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined.js';


export class DateField extends Field<DateFieldDefinition, string> {
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

  renderField() {
    let customValidity = this.definition.customValidity
    if (this.error) {
      customValidity = this.error.validityMessage
    }
    return html`<mwc-textfield label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" type="${this.type}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${this.definition.autocomplete}" validationmessage="${ifDefined(customValidity)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" min="${ifDefined(this.definition.max)}" max="${ifDefined(this.definition.max)}"  step="${ifDefined(this.definition.step)}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}" ></mwc-textfield>`;
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
    return "date"
  }
}

registerComponent({
  type: "date",
  tag: "formsey-date-material",
  cstr: DateField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/DateField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-date-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date-material>`
  }
})