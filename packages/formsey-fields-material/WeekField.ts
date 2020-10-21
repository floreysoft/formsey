import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from "./DateField";
@customElement("formsey-week-material")
export class WeekField extends DateField {
 protected get type() : TextFieldType {
    return "week"
  }
}

getLibrary("material").registerComponent("week", {
  importPath: "@formsey/fields-material/WeekField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-week-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-week-material>`
  }
})