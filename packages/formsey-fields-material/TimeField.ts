import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { DateField } from "./DateField";

@customElement("formsey-time-material")
export class TimeField extends DateField {
  protected get type(): TextFieldType {
    return "time"
  }
}

getLibrary("material").registerComponent("time", {
  importPath: "@formsey/fields-material/TimeField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-time-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time-material>`
  }
})