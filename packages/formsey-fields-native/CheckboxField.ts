import { BooleanFieldDefinition, LabeledField } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';


@customElement("formsey-checkbox")
export class CheckboxField extends LabeledField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("#checkbox")
  checkbox: HTMLInputElement

  renderField() {
    return html`<label class="bfl"><input id="checkbox" type="checkbox" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?checked="${this.value}" @change="${ e => e.stopPropagation()}" @input="${ e => e.stopPropagation()}" ?required="${this.definition.required}">${this.definition.controlLabel ? this.definition.controlLabel : ''}</label>`;
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
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-checkbox id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox>`
  }
})