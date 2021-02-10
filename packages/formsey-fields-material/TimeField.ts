import { getLibrary, Resources } from '@formsey/core/Registry';
import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from "./DateField";
@customElement("formsey-time-material")
export class TimeField extends DateField {
  protected get type(): TextFieldType {
    return "time"
  }
}

getLibrary("material").registerComponent("time", {
  importPath: "@formsey/fields-material/TimeField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-time-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time-material>`
  }
})