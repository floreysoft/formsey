import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { StringField } from './StringField';

/** `<formsey-search>`, field type `search`: Text field with `type="search"`. */
@customElement("formsey-search")
export class SearchField extends StringField {
  protected get type(): "search" {
    return "search"
  }
}

getLibrary("native").registerComponent("search", {
  importPath: "@formsey/fields-native/SearchField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-search id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-search>`
  }
})