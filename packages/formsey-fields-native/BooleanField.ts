import { BooleanFieldDefinition, LabeledField, register, ChangeEvent } from '@formsey/core';
import { html, property, query, css } from 'lit-element';

export class BooleanField extends LabeledField<BooleanFieldDefinition, boolean> {
  static get styles() {
    return [...super.styles, css`
    input[type="checkbox"] {
      width: 10px;
      height: 10px;
      margin: 0 5px 0 2px;
      transform: scale(1.5);
    }

    label {
      font-family: var(--formsey-label-font-family, var(--formsey-font-family));
      padding: 8px 0;
      height: 34px;
      box-sizing: border-box;
    }
    `]
  }

  @property({ type: Boolean })
  value: boolean;

  @query("#checkbox")
  checkbox: HTMLInputElement

  renderField() {
    return html`<label><input id="checkbox" type="checkbox" @click="${this.clicked}" .value="${this.value}" required="${this.definition.required}">${this.definition.label}</label>`;
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