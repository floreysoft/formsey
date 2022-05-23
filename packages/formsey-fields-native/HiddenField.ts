import { FieldChangeEvent } from '@formsey/core/Events';
import { Field } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-hiddens")
export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    if (!this.definition) return
    if (this.value != this.definition.default) {
      this.value = this.definition.default
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value))
    }
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value=${this.value}>`
  }
}

getLibrary("native").registerComponent("hidden", {
  importPath: "@formsey/fields-native/HiddenField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<FieldDefinition, any>) => {
    return html`<formsey-hiddens id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></formsey-hiddens>`
  }
})