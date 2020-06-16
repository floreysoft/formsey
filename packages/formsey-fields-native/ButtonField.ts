import { FieldDefinition, LabeledField, register } from '@formsey/core';
import { css, html, property, query } from 'lit-element';

export class ButtonField extends LabeledField<FieldDefinition, boolean> {
  static get styles() {
    return [...super.styles, css`
    :host {
    }
    `]
  }

  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button @click="${this.clicked}">{this.definition.label}</button>`;
  }

  focusField(path: string) {
    if (path == this.definition.name) {
      this.button.focus()
    }
  }
}
register("formsey-button", ButtonField)