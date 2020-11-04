import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { DateFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
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
    return html`<vaadin-date-picker style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" ?autofocus="${this.definition.autofocus}" @change="${this.changed}" min="${ifDefined(this.definition.min)}"  max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
  }
}

getLibrary("vaadin").registerComponent("date", {
  importPath: "@formsey/fields-vaadin/DateField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-date-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date-vaadin>`
  }
})