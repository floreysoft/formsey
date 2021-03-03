import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';


@customElement("formsey-time-vaadin")
export class TimeField extends StringField {
  protected get type(): "time" {
    return "time"
  }
}

getLibrary("vaadin").registerComponent("time", {
  importPath: "@formsey/fields-vaadin/TimeField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-time-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time-vaadin>`
  }
})
