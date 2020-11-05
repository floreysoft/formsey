import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { DateFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-date-picker';
import { DatePickerElement } from "@vaadin/vaadin-date-picker";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';
@customElement("formsey-date-vaadin")
export class DateField extends InputField<DateFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-date-picker")
  vaadinField: DatePickerElement

  renderField(customValidity: string) {
    return html`<vaadin-date-picker style="display:flex" label="${ifDefined(this.definition.label as string)}" .helperText="${this.definition.helpText as string}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" ?autofocus="${this.definition.autofocus}" @change="${this.changed}" min="${ifDefined(this.definition.min)}"  max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
  }


  invalid() {
    let validityState = {}
    const validity = ((<any>this.vaadinField.focusElement).focusElement as any).validity
    for (let key in validity) {
      if (validity[key]) {
        validityState[key] = validity[key]
      }
    }
    const validationMessage = this.vaadinField.errorMessage || (((<any>this.vaadinField.focusElement).focusElement as any)).validationMessage
    this.errors.set(this.definition.name, this.error ? this.error : new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("date", {
  importPath: "@formsey/fields-vaadin/DateField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-date-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date-vaadin>`
  }
})