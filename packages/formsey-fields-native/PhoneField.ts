import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-phone")
export class PhoneField extends StringField {
  protected get type() : "tel" {
    return "tel"
  }
}

getLibrary("native").registerComponent("phone", {
  importPath: "@formsey/fields-native/PhoneField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-phone id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-phone>`
  }
})