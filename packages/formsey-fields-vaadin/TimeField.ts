import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { FieldDefinition, StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-time-vaadin")
export class TimeField extends StringField {
  protected get type(): "time" {
    return "time"
  }
}

getLibrary("vaadin").registerComponent("time", {
  importPath: "@formsey/fields-vaadin/TimeField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-time-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time-vaadin>`
  }
})
