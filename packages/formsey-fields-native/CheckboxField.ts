import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/Events';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';


@customElement("formsey-checkbox")
export class CheckboxField extends LabeledField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean | undefined

  @query("#cb")
  checkbox: HTMLInputElement | undefined

  renderField() {
    if (this.definition) {
      return html`<label class="cfl"><input class="hid" id="cb" type="checkbox" @focus=${this.focused} @blur=${this.blurred} .checked="${!!this.value}" @change=${this.changed} @input=${this.inputted} ?required="${this.definition.required}"><span class="b cm">${getIcon("Checkmark")}</span>${this.definition.controlLabel ? html`<span class="cl">${this.definition.controlLabel}</span>` : undefined}</label>`;
    }
  }

  firstUpdated() {
    if (this.checkbox) {
      this.checkbox.indeterminate = this.definition?.indeterminate || false
    }
  }

  focusField(path: string): boolean {
    this.checkbox?.focus()
    return true
  }

  protected applyEvent(e: Event) {
    this.value = this.checkbox?.checked || false
  }
}

getLibrary("native").registerComponent("checkbox", {
  importPath: "@formsey/fields-native/CheckboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-checkbox id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${<boolean>value} .parentPath=${parentPath} .errors=${errors} @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></formsey-checkbox>`
  }
})