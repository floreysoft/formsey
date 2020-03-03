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
    if (!this.value.selection) {
      if (this.definition.default) {
        this.value.selection = this.definition.default as string;
      } else if (this.definition.forms[0].name) {
        this.value.selection = this.definition.forms[0].name;
      }
    }
    let values = this.definition.forms.map(form => form.name);
    let index = values.indexOf(this.value.selection);
    let selectedForm = this.definition.forms[index];
    let selection = selectedForm.prompt ? selectedForm.prompt : selectedForm.name;
    let errors = {}
    return html`<vaadin-combo-box style="display:flex" @change="${(event) => this.selectionChanged(event)}" name="${this.definition.name}" .items="${this.definition.forms.map(form => (form.prompt ? form.prompt : form.name))}" .value="${selection}"></vaadin-combo-box>
    <div class="fs-nested-form">${createField(this.configuration, selectedForm, this.value.value, errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>`;
  }

  protected selectionChanged(e: any) {
    let selection = e.currentTarget.value;
    let option = this.definition.forms.filter(form => (form.prompt ? form.prompt === selection : form.name === selection))[0].name;
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