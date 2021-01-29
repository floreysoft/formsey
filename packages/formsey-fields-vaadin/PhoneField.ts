import { getLibrary, Resources } from '@formsey/core/Components';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-phone-vaadin")
export class PhoneField extends StringField {
  protected get type() : "tel" {
    return "tel"
  }
}

getLibrary("vaadin").registerComponent("phone", {
  importPath: "@formsey/fields-vaadin/PhoneField",
  factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-phone-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-phone-vaadin>`
  }
})
