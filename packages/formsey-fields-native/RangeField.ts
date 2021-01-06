import { NumberFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
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
  factory: (components: Components, settings: Settings, definition: NumberFieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-range id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-range>`
  }
})