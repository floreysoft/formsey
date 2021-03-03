import { NumberFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { NumberField } from './NumberField';


@customElement("formsey-range")
export class RangeField extends NumberField {
  protected get type() : "range" {
    return "range"
  }

  protected get inputClassName() {
    return "input range"
  }
}

getLibrary("native").registerComponent("range", {
  importPath: "@formsey/fields-native/RangeField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, number>) => {
    return html`<formsey-range id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-range>`
  }
})