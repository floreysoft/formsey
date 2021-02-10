import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { DateFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from "./DateField";
@customElement("formsey-datetime-material")
export class DateTimeField extends DateField {
 protected get type() : TextFieldType {
    return "datetime-local"
  }
}

getLibrary("material").registerComponent("datetime", {
  importPath: "@formsey/fields-material/DateTimeField",
  template: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-datetime-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime-material>`
  }
})