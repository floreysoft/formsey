import { getLibrary, Resources } from '@formsey/core/Registry';
import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';
@customElement("formsey-datetime")
export class DateTimeField extends DateField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}

getLibrary("native").registerComponent("datetime", {
  importPath: "@formsey/fields-native/DateTimeField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-datetime id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime>`
  }
})