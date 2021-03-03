import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-checkbox")
export class CheckboxField extends LabeledField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("#checkbox")
  checkbox: HTMLInputElement

  renderField() {
    return html`<label class="cfl"><input id="checkbox" type="checkbox" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" .checked="${this.value}" @change="${ e => e.stopPropagation()}" @input="${ e => e.stopPropagation()}" ?required="${this.definition.required}">${this.definition.controlLabel ? this.definition.controlLabel : ''}</label>`;
  }

  clicked(e) {
    this.value = this.checkbox.checked
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }

  firstUpdated() {
    this.checkbox.indeterminate = this.definition.indeterminate
  }

  focusField(path: string) : boolean {
     this.checkbox.focus()
     return true
  }
}

getLibrary("native").registerComponent("checkbox", {
  importPath: "@formsey/fields-native/CheckboxField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<CheckboxFieldDefinition, boolean> ) => {
    return html`<formsey-checkbox id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${<boolean>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox>`
  }
})