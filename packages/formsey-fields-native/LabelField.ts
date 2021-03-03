import { LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from "@formsey/core/LabeledField";
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { classMap } from 'lit/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-label")
export class LabelField extends LabeledField<LabelFieldDefinition, any> {
  protected renderField() {
    let formatted = this.value
    if (this.definition.format == "number") {
      // @ts-ignore
      formatted = new Intl.NumberFormat(this.definition.locale || navigator.language, { style: this.definition.style.selection, currency: this.definition.style.value.currency, currencyDisplay: this.definition.style.value.currencyDisplay, currencySign: this.definition.style.value.currencySign, useGrouping: this.definition.useGrouping, signDisplay: this.definition.signDisplay, unit: this.definition.style.value.unit, unitDisplay: this.definition.style.value.unitDisplay }).format(this.value)
    }
    return html`<div class="${classMap({ l: true, "w": this.definition.wrap == "wrap" ? true : false })}"><span>${formatted}</span></div>`
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-label id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-label>`
  }
})