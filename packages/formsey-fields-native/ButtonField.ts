import { ButtonFieldDefinition, LabeledField, register } from '@formsey/core';
import { html, property, query } from 'lit-element';

export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button class="input" @click="${this.clicked}" ?disabled="${this.definition.disabled}">${this.definition.text}</button>`;
  }

  focusField(path: string) {
    if (path == this.definition.name) {
      this.button.focus()
    }
  }
}
register("formsey-button", ButtonField)