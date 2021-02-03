import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { DateFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';
@customElement("formsey-month")
export class MonthField extends DateField {
  protected get type() : "month" {
    return "month"
  }
}

getLibrary("native").registerComponent("month", {
  importPath: "@formsey/fields-native/MonthField",
    factory: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-month id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-month>`
  }
})