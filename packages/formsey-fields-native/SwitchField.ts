import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-switch")
export class SwitchField extends LabeledField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("input")
  checkbox: HTMLInputElement

  renderField() {
    return html`<label class="swl"><div class="sw"><input type="checkbox" ?disabled="${this.definition.disabled}" @input=${this.changed} @change="${this.changed}" .checked=${this.value} ?checked=${this.value}><span class="sl"></span></div>${this.definition.controlLabel}</label>`
  }

  focusField(path: string): boolean {
    this.checkbox.focus()
    return true
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = this.checkbox.checked;
    this.dispatchEvent(new ValueChangedEvent(e.type, this.path(), this.value));
  }
}

getLibrary("native").registerComponent("switch", {
  importPath: "@formsey/fields-native/SwitchField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-switch id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-switch>`
  }
})