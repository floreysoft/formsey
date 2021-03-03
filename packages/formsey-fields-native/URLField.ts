import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-url")
export class URLField extends StringField {
  protected get type(): "url" {
    return "url"
  }
}

getLibrary("native").registerComponent("url", {
  importPath: "@formsey/fields-native/URLField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-url id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-url>`
  }
})
