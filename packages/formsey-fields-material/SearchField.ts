import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-search-material")
export class SearchField extends StringField {
 protected get type() : TextFieldType {
    return "search"
  }
}

getLibrary("material").registerComponent("search", {
  importPath: "@formsey/fields-material/SearchField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-search-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-search-material>`
  }
})