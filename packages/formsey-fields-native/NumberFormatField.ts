import { LabelFieldDefinition, NumberFormatFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { LabelField } from '.';

@customElement("formsey-numberformat")
export class NumberFormatField extends LabelField<NumberFormatFieldDefinition> {
  protected format(value: any) {
    if (this.definition) {
      return new Intl.NumberFormat(this.definition.locale || navigator.language, { style: this.definition.style, useGrouping: this.definition.useGrouping, signDisplay: this.definition.signDisplay }).format(this.value)
    } else {
      return value
    }
  }
}
getLibrary("native").registerComponent("numberFormat", {
  importPath: "@formsey/fields-native/NumberFormatField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-numberformat id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-numberformat>`
  }
})