import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { FieldDefinition, LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { LabeledField } from "@formsey/core/LabeledField";
import { customElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-label")
export class LabelField extends LabeledField<LabelFieldDefinition, any> {
  protected renderField() {
    return html`<div class="${classMap({l: true, "w": this.definition.wrap})}"><span>${this.value}</span></div>`
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
    factory: ( { components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<LabelFieldDefinition, any> ) => {
    return html`<formsey-label id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-label>`
  }
})