import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { DateField } from './DateField';

@customElement("formsey-datetime")
export class DateTimeField extends DateField {
  protected get type(): "datetime-local" {
    return "datetime-local"
  }
}

getLibrary("native").registerComponent("datetime", {
  importPath: "@formsey/fields-native/DateTimeField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-datetime id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></formsey-datetime>`
  }
})