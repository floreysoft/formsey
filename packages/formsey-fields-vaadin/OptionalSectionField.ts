import { registerComponent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class OptionalSectionField extends NativeOptionalSectionField {
}

registerComponent({
  type: "optional-section",
  tag: "formsey-optional-section-vaadin",
  constructor: OptionalSectionField,
  libraries: ["vaadin" ],
  importPath: "@formsey/fields-vaadin/OptionalSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-optional-section-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-optional-section-vaadin>`
  }
})