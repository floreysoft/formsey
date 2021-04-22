import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined';
import { DateField } from "./DateField";

@customElement("formsey-month-material")
export class MonthField extends DateField {
  protected get type(): TextFieldType {
    return "month"
  }
}

getLibrary("material").registerComponent("month", {
  importPath: "@formsey/fields-material/MonthField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-month-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-month-material>`
  }
})