import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-checkbox")
export class CheckboxField extends LabeledField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean | undefined

  @query("#checkbox")
  checkbox: HTMLInputElement | undefined

  renderField() {
    if (this.definition) {
      return html`<label class="cfl"><input class="hid" id="checkbox" type="checkbox" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" .checked="${!!this.value}" @change="${(e: Event) => e.stopPropagation()}" ?required="${this.definition.required}"><span class="b cm">${getIcon("Checkmark")}</span>${this.definition.controlLabel ? html`<span class="cl">${this.definition.controlLabel}</span>` : undefined}</label>`;
    }
  }

  clicked(e: Event) {
    this.value = this.checkbox?.checked
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
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
}

getLibrary("native").registerComponent("checkbox", {
  importPath: "@formsey/fields-native/CheckboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-checkbox id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${<boolean>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox>`
  }
})