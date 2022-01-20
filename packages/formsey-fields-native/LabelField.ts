import { LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from "@formsey/core/LabeledField";
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-label")
export class LabelField extends LabeledField<LabelFieldDefinition, any> {
  protected renderField() {
    if (this.definition) {
      let formatted = this.value
      if (this.definition.format == "number") {
        // @ts-ignore
        formatted = new Intl.NumberFormat(this.definition.locale || navigator.language, { style: this.definition.style.selection, currency: this.definition.style.value.currency, currencyDisplay: this.definition.style.value.currencyDisplay, currencySign: this.definition.style.value.currencySign, useGrouping: this.definition.useGrouping, signDisplay: this.definition.signDisplay, unit: this.definition.style.value.unit, unitDisplay: this.definition.style.value.unitDisplay }).format(this.value)
      } else if (this.definition.format == "datetime") {
        const date = new Date(this.value)
        formatted = new Intl.DateTimeFormat(this.definition.locale || navigator.language, { dateStyle: this.definition.dateStyle, timeStyle: this.definition.timeStyle } as Intl.DateTimeFormatOptions).format(date)
      }
      return html`<div class="${classMap({ l: true, "w": this.definition.wrap == "wrap" ? true : false })}"><span>${formatted}</span></div>`
    }
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-label id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-label>`
  }
})