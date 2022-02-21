import { CurrencyFormatFieldDefinition, LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { LabelField } from '.';

@customElement("formsey-currencyformat")
export class CurrencyFormatField extends LabelField<CurrencyFormatFieldDefinition> {
  protected format(value: any) {
    if (this.definition) {
      return new Intl.NumberFormat(this.definition.locale || navigator.language, { style: "currency", currency: this.definition.currency, currencyDisplay: this.definition.currencyDisplay, currencySign: this.definition.currencySign, useGrouping: this.definition.useGrouping, signDisplay: this.definition.signDisplay }).format(this.value)
    } else {
      return value
    }
  }
}
getLibrary("native").registerComponent("currencyFormat", {
  importPath: "@formsey/fields-native/CurrencyFormatField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-currencyformat id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-currencyformat>`
  }
})