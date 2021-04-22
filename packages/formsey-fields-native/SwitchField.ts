import { CheckboxFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { CheckboxField } from './CheckboxField';

@customElement("formsey-switch")
export class SwitchField extends CheckboxField {
  renderField() {
    if (this.definition) {
      return html`<label class="swl"><div class="sw"><input class="hid" type="checkbox" id="cb" ?disabled="${this.definition.disabled}" @focus=${this.focused} @blur=${this.blurred} @input=${this.inputted} @change="${this.changed}" .checked=${!!this.value} ?checked=${this.value}><span class="sl"></span></div>${this.definition.controlLabel}</label>`
    }
  }
}

getLibrary("native").registerComponent("switch", {
  importPath: "@formsey/fields-native/SwitchField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-switch id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-switch>`
  }
})