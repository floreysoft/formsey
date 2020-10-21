import { NumberFieldDefinition } from '@formsey/core';
import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';

export class NumberField extends InputField<NumberFieldDefinition> {
  protected get type() : "number" {
    return "number"
  }
}

registerComponent({
  type: "number",
  tag: "formsey-number",
  constructor: NumberField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/NumberField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-number id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number>`
  }
})