import { StringFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-string")
export class StringField extends InputField<StringFieldDefinition, string> {
  protected get type(): "text" | "search" | "tel" | "url" | "email" | "password" {
    return "text"
  }

  firstUpdated() {
    if (this.definition?.autoselect) {
      this.input.addEventListener('focus', e => this.input.select())
    }
  }
}

getLibrary("native").registerComponent("string", {
  importPath: "@formsey/fields-native/StringField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-string id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string>`
  }
})