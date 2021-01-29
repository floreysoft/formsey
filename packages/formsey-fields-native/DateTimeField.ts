import { getLibrary, Resources } from '@formsey/core/Components';
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
    factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-datetime id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime>`
  }
})