import { register, StringFieldDefinition } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { TextFieldElement } from '@vaadin/vaadin-text-field';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';
import { VaadinField } from './VaadinField';

export class StringField extends VaadinField<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinTextField: TextFieldElement

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-text-field style="display:flex" label="${ifDefined(this.definition.label)}" help-text="${ifDefined(this.definition.helpText)}" ?readonly="${this.definition.readonly}" ?autoselect="${this.definition.autoselect}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @changed="${this.changed}"  name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}">`;
  }

  renderFooter() {
    return undefined
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinTextField.focus()
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinTextField.validate() : this.vaadinTextField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinTextField.errorMessage, false, {  })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

register({
  type: "string",
  tag: "formsey-string-vaadin",
  constructor: StringField,
  libraries: ["vaadin" ],
  importPath: "@formsey/fields-vaadin/StringField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-string-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string-vaadin>`
  }
})