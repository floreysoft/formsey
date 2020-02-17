import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { html, property } from 'lit-element';
import { createField, Field, ValueChangedEvent, OptionalSectionFieldDefinition } from '@formsey/core';
import { InvalidEvent } from '@formsey/core/InvalidEvent';

export class OptionalSectionValue {
  option: boolean;
  value: Object = {}
}

export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, OptionalSectionValue> {
  @property({ converter: Object })
  value: OptionalSectionValue;

  renderStyles() {
    return `vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }
    .fs-nested-form {
      margin-top: 5px;
    }`;
  }

  renderField() {
    if (!this.value) {
      this.value = new OptionalSectionValue();
    }
    if (typeof this.value.option == "undefined") {
      if (this.definition.default) {
        this.value.option = this.definition.default as boolean;
      }
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    let selectedForm = this.value.option ? this.definition.onForm : this.definition.offForm
    let form = selectedForm ? html`<div class="fs-nested-form">${createField(this.configuration, selectedForm, this.value.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}</div>` : html``;
    return html`<vaadin-checkbox style="display:flex" @change="${(event) => this.selectionChanged(event)}" .checked="${this.value.option}">${this.definition.label}</vaadin-checkbox>
    ${form}
    `;
  }

  protected selectionChanged(e: any) {
    this.value.option = e.currentTarget.checked;
    this.value.value = {}
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
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

customElements.define('formsey-optional-section', OptionalSectionField);