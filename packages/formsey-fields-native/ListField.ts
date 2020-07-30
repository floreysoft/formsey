import { ValueChangedEvent, LabeledField, ListFieldDefinition, register } from '@formsey/core';
import { html, property, query } from 'lit-element';

export class ListField extends LabeledField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("select")
  selectBox: HTMLSelectElement

  renderField() {
    return html`
    <select class="input" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" @change="${this.changed}" @input="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}" name="${this.definition.name}" ?disabled="${this.definition.disabled}" .value="${this.value}">
    ${this.definition.options.map(item => html`<option ?selected="${item.value ? item.value == this.value : item.label == this.value}" value="${item.value ? item.value : item.label}">${item.label ? item.label : item.value}</option>`)}
    </select>`;
  }

  focusField() {
    this.selectBox.focus()
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent(e.type, this.path(), this.value));
  }
}
register("formsey-list", ListField, "native", "list", { importPath: "@formsey/fields-native/ListField"})