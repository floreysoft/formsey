import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { DateField } from "./DateField";

@customElement("formsey-datetime-material")
export class DateTimeField extends DateField {
 protected get type() : TextFieldType {
    return "datetime-local"
  }
}

getLibrary("material").registerComponent("datetime", {
  importPath: "@formsey/fields-material/DateTimeField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id } : Resources<DateFieldDefinition, string> ) => {
    return html`<formsey-datetime-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-datetime-material>`
  }
})