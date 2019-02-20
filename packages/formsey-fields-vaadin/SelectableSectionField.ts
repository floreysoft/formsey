import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html, property } from 'lit-element';
import { ComplexField, ValueChangedEvent, SelectableSectionFieldDefinition } from '@formsey/core';

export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

export class SelectableSectionField extends ComplexField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;

  renderStyles() {
    return `.fs-nested-form {
      margin-top: 5px;
    }`;
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
    return html`<vaadin-combo-box style="display:flex" @change="${(event) => this.selectionChanged(event)}" name="${this.definition.name}" .items="${this.definition.forms.map(form => (form.prompt ? form.prompt : form.name))}" .value="${selection}"></vaadin-combo-box>
    <div class="fs-nested-form">${this.factory.create(selectedForm, this.value.value, (event: ValueChangedEvent<any>) => this.valueChanged(event))}</div>`;
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

customElements.define('formsey-selectable-section', SelectableSectionField);