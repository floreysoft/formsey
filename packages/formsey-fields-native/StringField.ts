import { StringFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';
@customElement("formsey-string")
export class StringField extends InputField<StringFieldDefinition, string> {
  protected get type() : "text" | "search" | "tel" | "url" | "email" | "password" {
    return "text"
  }

  firstUpdated() {
    if ( this.definition?.autoselect ) {
      this.input.addEventListener('focus', e => this.input.select())
    }
  }
}

getLibrary("native").registerComponent("string", {
  importPath: "@formsey/fields-native/StringField",
    factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-string id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string>`
  }
})
