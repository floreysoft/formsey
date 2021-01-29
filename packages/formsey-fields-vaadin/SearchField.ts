import { getLibrary, Resources } from '@formsey/core/Components';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-search-vaadin")
export class SearchField extends StringField {
  protected get type(): "search" {
    return "search"
  }
}

getLibrary("vaadin").registerComponent("search", {
  importPath: "@formsey/fields-vaadin/SearchField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-search-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-search-vaadin>`
  }
})
