import { BooleanFieldDefinition, LabeledField, register, ChangeEvent } from '@formsey/core';
import { html, property, query, css } from 'lit-element';
import { INPUT_STYLE } from './styles';

export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  static get styles() {
    return [...super.styles, css`
    :host {
    }

    input[type="checkbox"] {
      margin: var(--fs-widget-padding, 0 .5em 0 0);
      font-family: var(--formsey-font-family, var(--fs-font-family, inherit));
      font-size: var(--formsey-font-size, var(--fs-font-size, inherit));
      color: var(--formsey-text-color, var(--fs-text-color, inherit));
    }

    label {
      height: var(--formsey-input-height, 2em);
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    `]
  }

  @property({ type: Boolean })
  value: boolean;

  @query("#checkbox")
  checkbox: HTMLInputElement

  renderField() {
    return html`<label><input id="checkbox" type="checkbox" @click="${this.clicked}" ?checked="${this.value}" required="${this.definition.required}">${this.definition.label}</label>`;
  }

  clicked(e ) {
    this.value = this.checkbox.checked
    this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
  }

  firstUpdated() {
    this.checkbox.indeterminate = this.definition.indeterminate
  }

  focusField(path: string) {
    if (path == this.definition.name) {
      this.checkbox.focus()
    }
  }
}
register("formsey-boolean", BooleanField)