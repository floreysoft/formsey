import { DateFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';
@customElement("formsey-date")
export class DateField extends InputField<DateFieldDefinition, string> {
  protected get type() : "datetime" | "date" | "month" | "week" | "time" | "datetime-local" {
    return "date"
  }
}

getLibrary("native").registerComponent("date", {
  importPath: "@formsey/fields-native/DateField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-date id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date>`
  }
})