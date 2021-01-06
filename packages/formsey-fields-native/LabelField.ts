import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { LabeledField } from "@formsey/core/LabeledField";
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-label")
export class LabelField extends LabeledField<FieldDefinition, any> {
  protected renderField() {
    return html`<div class="l">${this.value}</div>`
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-label id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-label>`
  }
})