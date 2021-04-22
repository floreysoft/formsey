import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { StringField } from './StringField';


@customElement("formsey-month-vaadin")
export class MonthField extends StringField {
  protected get type() : "month" {
    return "month"
  }
}

getLibrary("vaadin").registerComponent("month", {
  importPath: "@formsey/fields-vaadin/MonthField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-month-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-month-vaadin>`
  }
})
