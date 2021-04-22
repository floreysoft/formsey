import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { Field } from './Field';
import { FieldDefinition } from "./FieldDefinitions";
import { getLibrary, Resources } from "./Registry";

@customElement("formsey-hidden")
export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    if (!this.definition) return
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : this.definition.default || ''}">`
  }
}

getLibrary("native").registerComponent("hidden", {
  importPath: "@formsey/fields-native/HiddenField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<FieldDefinition, any>) => {
    return html`<formsey-hidden id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-hidden>`
  }
})