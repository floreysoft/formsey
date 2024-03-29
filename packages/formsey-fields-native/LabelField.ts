import { LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from "@formsey/core/LabeledField";
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-label")
export class LabelField<T extends LabelFieldDefinition> extends LabeledField<T, any> {
  protected renderField() {
    if (this.definition) {
      let formatted = this.format(this.value)
      return html`<div class="${classMap({ l: true, "w": this.definition.wrap == "wrap" ? true : false })}"><span>${formatted}</span></div>`
    }
  }

  protected format(value: any) {
    return value
  }
}
getLibrary("native").registerComponent("label", {
  importPath: "@formsey/fields-native/LabelField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-label id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-label>`
  }
})