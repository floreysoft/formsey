import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { DateField } from "./DateField";

@customElement("formsey-week-material")
export class WeekField extends DateField {
  protected get type(): TextFieldType {
    return "week"
  }
}

getLibrary("material").registerComponent("week", {
  importPath: "@formsey/fields-material/WeekField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-week-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-week-material>`
  }
})