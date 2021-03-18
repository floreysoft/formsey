import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-switch")
export class SwitchField extends LabeledField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean = false

  @query("input")
  checkbox: HTMLInputElement | undefined

  renderField() {
    if (this.definition) {
      return html`<label class="swl"><div class="sw"><input class="hid" type="checkbox" ?disabled="${this.definition.disabled}" @input=${this.changed} @change="${this.changed}" .checked=${this.value} ?checked=${this.value}><span class="sl"></span></div>${this.definition.controlLabel}</label>`
    }
  }

  focusField(path: string): boolean {
    this.checkbox?.focus()
    return true
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = this.checkbox?.checked || false
    this.dispatchEvent(new FieldChangeEvent(e.type, this.path(), this.value));
  }
}

getLibrary("native").registerComponent("switch", {
  importPath: "@formsey/fields-native/SwitchField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-switch id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-switch>`
  }
})