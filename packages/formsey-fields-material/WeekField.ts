import { getLibrary, Resources } from '@formsey/core/Components';
import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from "./DateField";
@customElement("formsey-week-material")
export class WeekField extends DateField {
  protected get type(): TextFieldType {
    return "week"
  }
}

getLibrary("material").registerComponent("week", {
  importPath: "@formsey/fields-material/WeekField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-week-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-week-material>`
  }
})