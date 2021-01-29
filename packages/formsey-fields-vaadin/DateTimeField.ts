import { getLibrary, Resources } from '@formsey/core/Components';
import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-datetime-vaadin")
export class DateTimeField extends StringField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}

getLibrary("vaadin").registerComponent("datetime", {
  importPath: "@formsey/fields-vaadin/DateTimeField",
  factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-datetime-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime-vaadin>`
  }
})
