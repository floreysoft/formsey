import { ListFieldDefinition, ChangeEvent, LabeledField, register } from '@formsey/core';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class ListField extends LabeledField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("select")
  selectBox : HTMLSelectElement

  static get styles() {
    return [...super.styles, css`
    select {
      width: 100%;
      height: var(--formsey-input-height, 34px);
      box-sizing: border-box;
      border-radius: var(--formsey-input-border-radius, 4px);
      padding: var(--formsey-input-padding, 8px);
      background: var(--formsey-input-background, #99999920);
      border: var(--formsey-input-border, 1px solid #99999920);
      outline: none;
      user-select: auto;
      transition: all 0.12s;
    }
    select:focus {
      border: 1px solid var(--formsey-input-focus-border-color, #a0a0a0);
    }
    `]
  }

  renderField() {
    return html`
    <select ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" @change="${this.changed}" name="${this.definition.name}" ?disabled="${this.definition.disabled}" .value="${ifDefined(this.value)}">
    ${this.definition.options.map(item => html`<option ?selected="${item.value ? item.value == this.value : item.label == this.value}" value="${item.value ? item.value : item.label}">${item.label ? item.label : item.value}</option>`)}
    </select>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.selectBox.focus()
    }
  }

  protected changed(e: any) {
    this.value = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }
}
register("formsey-list", ListField)