import { LabeledField } from '@formsey/core';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';


@customElement("formsey-template")
export class TemplateField extends LabeledField<FieldDefinition, string> {
  renderField() {
    if (this.definition) {
      return html`${this.definition.default}`
    }
  }
}

getLibrary("native").registerComponent("template", {
  importPath: "@formsey/fields-native/TemplateField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<FieldDefinition, string>) => {
    return html`<formsey-markup id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-markup>`
  }
})