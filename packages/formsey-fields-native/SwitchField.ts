import { CheckboxFieldDefinition, LabeledField } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
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
    return html`<label class="swl"><div class="sw"><input type="checkbox" ?disabled="${this.definition.disabled}" ?checked="${this.value}" @input="${e => { e.stopPropagation() }} " @change="${this.clicked}"><span class="sl"></span></div>${this.definition.controlLabel}</label>`
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

getLibrary("native").registerComponent("switch", {
  importPath: "@formsey/fields-native/SwitchField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-switch id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-switch>`
  }
})