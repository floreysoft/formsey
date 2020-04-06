import { createField, Field, ListFieldDefinition, SelectableSectionFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { css, customElement, html, property } from 'lit-element';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

@customElement("formsey-selectable-section")
export class SelectableSectionField extends Field<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

  static get styles() {
    return [...super.styles, css`.fs-nested-form {
      margin-top: 5px;
    }`]
  }

  renderField() {
    if (this.definition && this.definition.selections) {
      let values = this.definition.selections.map(selection => ( selection.value ? selection.value : selection.label));
      let options = this.definition.selections.map(selection => { return {label: selection.label, value : selection.value}});
      let index = 0
      if (this.value && this.value.selection) {
        index = values.indexOf(this.value.selection);
      } else {
        this.value = { selection: values[0], value : {}}
      }
      let selection = this.definition.selections[index];
      let value = selection.label ? selection.label : selection.value;
      let errors = {}
      return html`${createField(this.configuration, { type : "list", name: "selection", prompt: this.definition.prompt, helpText: this.definition.helpText, options } as ListFieldDefinition, value, errors, (event: ValueChangedEvent<string>) => this.selectionChanged(event), null)}
      <div class="fs-nested-form">${createField(this.configuration, selection.form, this.value ? this.value.value : undefined, errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>`;
    }
    return undefined
  }

  protected selectionChanged(e: ValueChangedEvent<string>) {
    let value = e.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label=== value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = {}
      this.requestUpdate()
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
  }

  protected valueChanged(e: any) {
    this.value.value = e.value;
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}