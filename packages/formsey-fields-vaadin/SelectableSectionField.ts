import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html, property, css, customElement } from 'lit-element';
import { createField, ValueChangedEvent, SelectableSectionFieldDefinition, Field } from '@formsey/core';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

@customElement("formsey-selectable-section-vaadin")
export class SelectableSectionField extends Field<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

  static get styles() {
    return [...super.styles, css`.fs-nested-form {
      margin-top: 5px;
    }`]
  }

  renderField() {
    if (this.definition && this.definition.forms) {
      let values = this.definition.forms.map(form => ( form.name ? form.name : form.prompt));
      let index = 0
      if (this.value && this.value.selection) {
        index = values.indexOf(this.value.selection);
      } else {
        this.value = { selection: values[0], value : {}}
      }
      let selectedForm = this.definition.forms[index];
      selectedForm.type = "form"
      let selection = selectedForm.name ? selectedForm.name : selectedForm.prompt;
      let errors = {}
      return html`<vaadin-combo-box style="display:flex" @change="${(event) => this.selectionChanged(event)}" name="${this.definition.name}" .items="${this.definition.forms.map(form => (form.name ? form.name : form.prompt))}" .value="${selection}"></vaadin-combo-box>
      <div class="fs-nested-form">${createField(this.configuration, selectedForm, this.value ? this.value.value : undefined, errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>`;
    }
    return undefined
  }

  protected selectionChanged(e: any) {
    let selection = e.currentTarget.value;
    let option = this.definition.forms.filter(form => (form.name ? form.name === selection : form.prompt === selection))[0].name;
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