import { createField, Field, LabeledField, ListFieldDefinition, SelectableSectionFieldDefinition } from '@formsey/core';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Components';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

@customElement("formsey-selectable-section")
export class SelectableSectionField extends LabeledField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

  values: string[]
  selectedValue: string
  index: number

  render() {
    let form = undefined
    if (this.definition && this.definition.selections) {
      this.values = this.definition.selections.map(selection => (selection.value ? selection.value : selection.label));
      this.index = 0
      if (this.value && this.value.selection) {
        this.index = this.values.indexOf(this.value.selection);
      } else {
        this.value = { selection: this.values[0], value: {} }
      }
      let selection = this.definition.selections[this.index];
      if (selection) {
        this.selectedValue = selection.value ? selection.value : selection.label;
      }
      if (selection) {
        form = html`${selection?.fields ? html`<div class="form">${createField({ components: this.components, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout } as FormDefinition, value: this.value?.value, parentPath: this.path() + ".value", errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>` : undefined}`;
      }
    }
    const staticFormatter = getFormatter(this.definition.layout?.static?.formatter)
    return html`<section style=${ifDefined(staticFormatter?.containerStyle(this.definition.layout?.static))}>${super.render()}${form}<div class="fbg" style="${ifDefined(staticFormatter?.fieldStyle(this.definition.layout?.static))}"></div></section>`;
  }

  renderField() {
    let options = this.definition?.selections?.map(selection => { return { label: selection.label, value: selection.value } });
    return html`${createField({ components: this.components, settings: this.settings, definition: { type: "list", name: "selection", options } as ListFieldDefinition, value: this.selectedValue, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.selectionChanged(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}`
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected selectionChanged(e: ValueChangedEvent<string>) {
    let value = e.detail.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label === value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = {}
      this.dispatchEvent(new ValueChangedEvent("inputChange", e.detail.name, this.value));
      this.requestUpdate()
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (e.detail.name.startsWith(this.path() + ".value")) {
      let name = e.detail.name.substring((this.path() + ".value").length + 1).split('.')[0].split('[')[0]
      if (name) {
        if (typeof this.value.value != "object") {
          this.value.value = {}
        }
        this.value.value[name] = e.detail.value;
      } else {
        this.value.value = e.detail.value
      }
      this.dispatchEvent(new ValueChangedEvent(e.type as "change" | "input" | "inputChange", e.detail.name, this.value));
    }
  }
}

getLibrary("native").registerComponent("selectableSection", {
  importPath: "@formsey/fields-native/SelectableSectionField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SelectableSectionFieldDefinition, SelectableSectionValue>) => {
    return html`<formsey-selectable-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section>`
  }
})