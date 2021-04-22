import { DateFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputField } from './InputField';

@customElement("formsey-date")
export class DateField extends InputField<DateFieldDefinition, string> {
  protected get type(): "datetime" | "date" | "month" | "week" | "time" | "datetime-local" {
    return "date"
  }
}

getLibrary("native").registerComponent("date", {
  importPath: "@formsey/fields-native/DateField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-date id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}" @invalid=${invalidHandler}></formsey-date>`
  }
})