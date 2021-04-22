import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-date-picker';
import { DatePickerElement } from "@vaadin/vaadin-date-picker";
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputField } from './InputField';

@customElement("formsey-date-vaadin")
export class DateField extends InputField<DateFieldDefinition, string> {
  @query("vaadin-date-picker")
  vaadinField: DatePickerElement | undefined

  renderField(customValidity: string) {
    if (this.definition) {
      return html`<vaadin-date-picker style="display:flex" label="${ifDefined(this.definition.label as string)}" .helperText="${this.definition.helpText as string}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" ?autofocus="${this.definition.autofocus}" @change="${this.changed}" min="${ifDefined(this.definition.min)}"  max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
    }
  }

  invalid() {
    let validityState: { [key: string]: string } = {}
    const validity = ((<any>this.vaadinField?.focusElement).focusElement as any).validity
    for (let key in validity) {
      if (validity[key]) {
        validityState[key] = validity[key]
      }
    }
    const validationMessage = this.vaadinField?.errorMessage || (((<any>this.vaadinField?.focusElement).focusElement as any)).validationMessage
    this.errors = this.errors || new InvalidErrors()
    this.errors.set(this.path(), new InvalidError(validationMessage, false, validityState))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("date", {
  importPath: "@formsey/fields-vaadin/DateField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-date-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-date-vaadin>`
  }
})