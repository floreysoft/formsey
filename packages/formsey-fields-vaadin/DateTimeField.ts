import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';


@customElement("formsey-datetime-vaadin")
export class DateTimeField extends StringField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}

getLibrary("vaadin").registerComponent("datetime", {
  importPath: "@formsey/fields-vaadin/DateTimeField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-datetime-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime-vaadin>`
  }
})
