import { getLibrary, Resources } from '@formsey/core/Components';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';
@customElement("formsey-password-material")
export class PasswordField extends StringField {
  protected get type(): TextFieldType {
    return "password"
  }
}

getLibrary("material").registerComponent("password", {
  importPath: "@formsey/fields-material/PasswordField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-password-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-password-material>`
  }
})