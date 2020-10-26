import { Field } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { StringFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@vaadin/vaadin-text-field/vaadin-password-field";
import { PasswordFieldElement } from '@vaadin/vaadin-text-field/vaadin-password-field';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-password-vaadin")
export class PasswordField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-password-field")
  vaadinPasswordField: PasswordFieldElement

  render() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-password-field style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText as string}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-password-field>`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinPasswordField.focus()
    }
  }
  validate(report: boolean) {
    this.valid = report ? this.vaadinPasswordField.validate() : this.vaadinPasswordField.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinPasswordField.errorMessage, false, {})
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("password", {
  importPath: "@formsey/fields-vaadin/PasswordField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-password-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-password-vaadin>`
  }
})