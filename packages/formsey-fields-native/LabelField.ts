import { getLibrary, Resources } from '@formsey/core/Registry';
import { LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from "@formsey/core/LabeledField";
import { customElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-label")
export class LabelField extends LabeledField<LabelFieldDefinition, any> {
  protected renderField() {
    let formatted = this.value
    if (this.definition.format == "number") {
      formatted = new Intl.NumberFormat(this.definition.locale || navigator.language, { style: this.definition.style.selection, currency: this.definition.style.value.currency, currencyDisplay: this.definition.style.value.currencyDisplay, currencySign: this.definition.style.value.currencySign, useGrouping: this.definition.useGrouping, signDisplay: this.definition.signDisplay, unit: this.definition.style.value.unit, unitDisplay: this.definition.style.value.unitDisplay }).format(this.value)
    }
    return html`<div class="${classMap({ l: true, "w": this.definition.wrap == "wrap" ? true : false })}"><span>${formatted}</span></div>`
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-label id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-label>`
  }
})