import { ListFieldDefinition, ChangeEvent, LabeledField, register } from '@formsey/core';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { INPUT_STYLE } from './styles';

export class ListField extends LabeledField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("select")
  selectBox : HTMLSelectElement

  renderField() {
    return html`
    <select class="input" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" @change="${this.changed}" name="${this.definition.name}" ?disabled="${this.definition.disabled}" .value="${this.value}">
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