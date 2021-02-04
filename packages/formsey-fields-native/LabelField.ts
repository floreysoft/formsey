import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { FieldDefinition, LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { LabeledField } from "@formsey/core/LabeledField";
import { customElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { IntlMessageFormat } from 'intl-messageformat'

@customElement("formsey-label")
export class LabelField extends LabeledField<LabelFieldDefinition, any> {
  protected renderField() {
    const formatted = new IntlMessageFormat(`{value, ${this.definition.format}, ${this.definition.skeleton}}`, this.definition.locale).format({ value: this.value })
    return html`<div class="${classMap({ l: true, "w": this.definition.wrap == "wrap" ? true : false })}"><span>${formatted}</span></div>`
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-label id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-label>`
  }
})