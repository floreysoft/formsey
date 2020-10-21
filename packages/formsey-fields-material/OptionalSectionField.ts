import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { OptionalSectionField as NativeOptionalSectionField } from '@formsey/fields-native/OptionalSectionField';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
@customElement("formsey-optional-section-material")
export class OptionalSectionField extends NativeOptionalSectionField {
}

getLibrary("material").registerComponent("optionalSection", {
  importPath: "@formsey/fields-material/OptionalSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-optional-section-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-optional-section-material>`
  }
})