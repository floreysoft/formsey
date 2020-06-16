import { FieldDefinition, LabeledField, register, ButtonFieldDefinition } from '@formsey/core';
import { css, html, property, query } from 'lit-element';
import { INPUT_STYLE } from './styles';

export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  static get styles() {
    return [...super.styles, INPUT_STYLE, css`
    :host {
    }
    button {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
    }
    button:hover:not([disabled]) {
      cursor: pointer;
      background-color: var(--fs-widget-background-color-hover);
    }
    button:focus:not([disabled]) {
      border-color: var(--fs-border-color-focus);
    }
    button:active:not([disabled]) {
      background-color: var(--fs-widget-background-color-selected);
    }
    button:disabled {
      opacity: 0.5;
  }
  button.primary {
    background-color: var(--fs-accent-color);
    color: var(--fs-accent-color-text);
    text-transform: uppercase;
  }
  button.primary:hover {
    background-color: var(--fs-accent-color-hover);
  }
    `]
  }

  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button class="input" @click="${this.clicked}">${this.definition.text}</button>`;
  }

  focusField(path: string) {
    if (path == this.definition.name) {
      this.button.focus()
    }
  }
}
register("formsey-button", ButtonField)