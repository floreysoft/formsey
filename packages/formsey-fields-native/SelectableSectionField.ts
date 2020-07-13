import { createField, LabeledField, ListFieldDefinition, register, SelectableSectionFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html, property } from 'lit-element';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

export class SelectableSectionField extends LabeledField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

  renderField() {
    if (this.definition && this.definition.selections) {
      let values = this.definition.selections.map(selection => (selection.value ? selection.value : selection.label));
      let options = this.definition.selections.map(selection => { return { label: selection.label, value: selection.value } });
      let index = 0
      if (this.value && this.value.selection) {
        index = values.indexOf(this.value.selection);
      } else {
        this.value = { selection: values[0], value: {} }
      }
      let selection = this.definition.selections[index];
      if (selection) {
        let value = selection.label ? selection.label : selection.value;
        let errors = new InvalidErrors()
        return html`${createField(this.components, { type: "list", name: "selection", label: this.definition.label, helpText: this.definition.helpText, options } as ListFieldDefinition, value, this.path(), errors, (event: ValueChangedEvent<string>) => this.selectionChanged(event), null)}
      <div class="form">${createField(this.components, selection.form, this.value?.value, this.path(), errors, (event: ValueChangedEvent<any>) => this.changed(event), null)}</div>`;

      }
    }
    return undefined
  }

  protected selectionChanged(e: ValueChangedEvent<string>) {
    let value = e.detail.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label === value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = {}
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
      this.requestUpdate()
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    if ( e.detail.name.startsWith(this.path())) {
      let name = e.detail.name.substring(this.path().length+1).split('.')[0]
      this.value.value[name] = e.detail.value;
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    }
  }
}
register("formsey-selectable-section", SelectableSectionField, ["native", "vaadin"], "selectableSection", "@formsey/fields-native/SelectableSectionField")