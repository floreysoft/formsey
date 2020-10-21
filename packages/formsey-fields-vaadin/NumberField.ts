import { NumberFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import { NumberFieldElement } from '@vaadin/vaadin-text-field/vaadin-number-field';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { VaadinField } from './VaadinField';
@customElement("formsey-number-vaadin")
export class NumberField extends VaadinField<NumberFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-number-field")
  vaadinNumberField: NumberFieldElement

  renderField() {
    let customValidity = this.definition.customValidity
    if ( this.error ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-number-field style="display:flex;width:100%" label="${ifDefined(this.definition.label)}" has-controls ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete=${!!this.definition.autocomplete} @change="${this.changed}" @input="${this.inputted}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" preventinvalidinput="true" .value="${this.value? this.value : ''}">`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinNumberField.focus()
    }
  }

  validate() {
    let validity = this.vaadinNumberField.checkValidity() as boolean
    if (!validity) {
      this.invalid()
    }
    return validity
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinNumberField.errorMessage, false, { })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("number", {
  importPath: "@formsey/fields-vaadin/NumberField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-number-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number-vaadin>`
  }
})