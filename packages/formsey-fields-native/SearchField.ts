import { getLibrary, Resources } from '@formsey/core/Registry';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';
@customElement("formsey-search")
export class SearchField extends StringField {
  protected get type(): "search" {
    return "search"
  }
}

getLibrary("native").registerComponent("search", {
  importPath: "@formsey/fields-native/SearchField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-search id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-search>`
  }
})