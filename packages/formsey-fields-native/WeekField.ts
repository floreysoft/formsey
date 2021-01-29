import { getLibrary, Resources } from '@formsey/core/Components';
import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';
@customElement("formsey-week")
export class WeekField extends DateField {
  protected get type(): "week" {
    return "week"
  }
}

getLibrary("native").registerComponent("week", {
  importPath: "@formsey/fields-native/WeekField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-week id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-week>`
  }
})
