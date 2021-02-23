import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { FieldDefinition, StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';
@customElement("formsey-email")
export class EmailField extends StringField {
  protected get type() : "email" {
    return "email"
  }
}

getLibrary("native").registerComponent("email", {
  importPath: "@formsey/fields-native/EmailField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-email id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-email>`
  }
})
