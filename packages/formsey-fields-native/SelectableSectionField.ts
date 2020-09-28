import { createField, Field, LabeledField, ListFieldDefinition, SelectableSectionFieldDefinition } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit-element";
import { property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';


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
        let value = selection.value ? selection.value : selection.label;
        let errors = new InvalidErrors()
        return html`${createField(this.components, this.settings, { type: "list", name: "selection", options } as ListFieldDefinition, value, this.path(), errors, (event: ValueChangedEvent<string>) => this.selectionChanged(event), null)}
      <div class="form">${createField(this.components, this.settings, selection.form, this.value?.value, this.path()+".value", errors, (event: ValueChangedEvent<any>) => this.changed(event), null)}</div>`;

      }
    }
    return undefined
  }

  public focusField(path : string) {
    if ( path == this.path()+".selection" ) {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path()+".selection"));
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
    if ( e.detail.name.startsWith(this.path()+".value")) {
      let name = e.detail.name.substring((this.path()+".value").length+1).split('.')[0].split('[')[0]
      if ( name ) {
        if ( typeof this.value.value != "object" ) {
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
register({
  type: "selectableSection",
  tag: "formsey-selectable-section",
  constructor: SelectableSectionField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/SelectableSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-selectable-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section>`
  }
})