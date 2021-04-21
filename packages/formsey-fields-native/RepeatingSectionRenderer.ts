import { createField } from '@formsey/core/Field';
import { LabelFieldDefinition, RepeatingFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from "@formsey/core/LabeledField";
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';

@customElement("formsey-repeating-section-renderer")
export class RepeatingSectionRenderer extends LabeledField<RepeatingFieldDefinition, { [key: string]: any }[]> {
  protected renderField() {
    if (this.definition) {
      const templates = []
      for (let i = 0; i < this.definition.fields?.length; i++) {
        const field = this.definition.fields[i]
        if (field.type && field.name) {
          const renderer = this.library?.components[field.type]?.renderer || "label"
          templates.push(createField({ library: this.library, settings: this.settings, definition: { ...field, type: renderer, label: undefined, helpText: undefined }, value: this.value?.[i][field.name] }))
        }
      }
      return html`<div>${templates}</div>`
    }
  }
}
getLibrary("native").registerComponent("repeatingSectionRenderer", {
  importPath: "@formsey/fields-native/RepeatingSectionRenderer",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-repeating-section-renderer id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-repeating-section-renderer>`
  }
})