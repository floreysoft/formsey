import { ChangeEvent, createField, LabeledField, ListFieldDefinition, register, SelectableSectionFieldDefinition, ClickEvent } from '@formsey/core';
import { css, html, property } from 'lit-element';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

export class SelectableSectionField extends LabeledField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

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
      return html`${createField(this.components, { type : "list", name: "selection", label: this.definition.label, helpText: this.definition.helpText, options } as ListFieldDefinition, value, this.path(), errors, (event: ChangeEvent<string>) => this.selectionChanged(event), null)}
      <div class="form">${createField(this.components, selection.form, this.value ? this.value.value : undefined, this.path(), errors, (event: ChangeEvent<any>) => this.changed(event), null)}</div>`;
    }
    return undefined
  }

  protected selectionChanged(e: ChangeEvent<string>) {
    let value = e.detail.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label=== value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = {}
      this.requestUpdate()
      if (this.definition.name) {
        this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
      }
    }
  }

  protected changed(e: any) {
    this.value.value = e.value;
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
    }
  }
}
register(["native", "vaadin"], "selectableSection", "formsey-selectable-section", SelectableSectionField)