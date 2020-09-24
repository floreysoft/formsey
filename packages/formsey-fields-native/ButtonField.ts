import { ButtonFieldDefinition, LabeledField, register } from '@formsey/core';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';

export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button class="input" type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}">${this.definition.text}</button>`;
  }

  focusField() : boolean {
    this.button.focus()
    return true
  }
}
register("formsey-button", ButtonField, "native", "button", { importPath: "@formsey/fields-native/ButtonField"})