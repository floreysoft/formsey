import { getLibrary, Resources } from '@formsey/core/Components';
import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';
@customElement("formsey-time")
export class TimeField extends DateField {
  protected get type(): "time" {
    return "time"
  }
}

getLibrary("native").registerComponent("time", {
  importPath: "@formsey/fields-native/TimeField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-time id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time>`
  }
})
