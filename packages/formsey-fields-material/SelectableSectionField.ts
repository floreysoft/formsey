import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { SelectableSectionField as NativeSelectableSectionField, SelectableSectionValue } from '@formsey/fields-native/SelectableSectionField';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
@customElement("formsey-selectable-section-material")
export class SelectableSectionField extends NativeSelectableSectionField {
}

getLibrary("material").registerComponent("selectableSection", {
  importPath: "@formsey/fields-material/SelectableSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: SelectableSectionValue, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-selectable-section-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section-material>`
  }
})