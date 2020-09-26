import { register } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class OptionalSectionField extends NativeOptionalSectionField {
}

register({
  type: "optionalSection",
  tag: "formsey-optional-section-material",
  constructor: OptionalSectionField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/OptionalSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-optional-section-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-optional-section-material>`
  }
})