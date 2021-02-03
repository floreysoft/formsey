import { NumberFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
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
  factory: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, number>) => {
    return html`<formsey-range id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-range>`
  }
})