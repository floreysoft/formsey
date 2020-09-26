import { Field, ListFieldDefinition, register } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-list/mwc-list-item";
import { Select } from "@material/mwc-select";
import "@material/mwc-select/mwc-select";
import { css, html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class ListField extends Field<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-select")
  materialListField: Select

  static get styles() {
    return [...super.styles, css`
    mwc-select {
      width: 100%;
    }
  `]
  }

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error ) {
      customValidity = this.error.validityMessage
    }
    return html`<mwc-select label="${ifDefined(this.definition.label)}" helper="${ifDefined(this.definition.helpText)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" validationmessage="${ifDefined(customValidity)}" @selected="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}">
    ${this.definition.options.map(item => html`<mwc-list-item ?selected="${item.value ? item.value == this.value : item.label == this.value}" value="${item.value ? item.value : item.label}">${item.label ? item.label : item.value}</mwc-list-item>`)}
    </mwc-select>`;
  }

  firstUpdated() {
    this.materialListField.validityTransform = (newValue, nativeValidity) => {
      if ( this.error ) {
        return {
          valid: false,
          validationMessage: this.error.validityMessage,
          ...this.error.validityState
        }
      }
      return nativeValidity;
    }
  }

  validate(report : boolean) {
    if ( report ) {
      return this.materialListField.reportValidity() as boolean
    } else {
      return this.materialListField.checkValidity() as boolean
    }
  }

  invalid() {
    let validityState: ValidityState = this.materialListField.validity
    for (let key in validityState) {
      if (!validityState[key]) {
        delete validityState[key]
      }
    }
    let validationMessage = this.materialListField.validationMessage
    if ( validityState['validationMessage'] ) {
      validationMessage = validityState['validationMessage']
      delete validityState['validationMessage']
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(validationMessage, false, validityState )
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

register({
  type: "list",
  tag: "formsey-list-material",
  constructor: ListField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/ListField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-list-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-list-material>`
  }
})