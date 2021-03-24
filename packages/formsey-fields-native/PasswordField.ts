import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-password")
export class PasswordField extends StringField {
  protected get type(): "password" {
    return "password"
  }
}

getLibrary("native").registerComponent("password", {
  importPath: "@formsey/fields-native/PasswordField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-password id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-password>`
  }
})