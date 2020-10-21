import { registerComponent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { SelectableSectionField as NativeSelectableSectionField } from '@formsey/fields-native/SelectableSectionField';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class SelectableSectionField extends NativeSelectableSectionField {

}

registerComponent({
  type: "selectableSection",
  tag: "formsey-selectable-section-material",
  constructor: SelectableSectionField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/SelectableSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-selectable-section-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section-material>`
  }
})