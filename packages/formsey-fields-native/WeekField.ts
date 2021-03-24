import { DateFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { DateField } from './DateField';

@customElement("formsey-week")
export class WeekField extends DateField {
  protected get type(): "week" {
    return "week"
  }
}

getLibrary("native").registerComponent("week", {
  importPath: "@formsey/fields-native/WeekField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<DateFieldDefinition, string>) => {
    return html`<formsey-week id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-week>`
  }
})
