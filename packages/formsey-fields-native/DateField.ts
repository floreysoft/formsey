import { DateFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
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
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-date id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-date>`
  }
})