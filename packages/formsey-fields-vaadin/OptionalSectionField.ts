import { createField, LabeledField, OptionalSectionFieldDefinition, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { css, customElement, html, property } from 'lit-element';

export class OptionalSectionValue {
  option: boolean;
  value: Object = {}
}

@customElement("formsey-optional-section-vaadin")
export class OptionalSectionField extends LabeledField<OptionalSectionFieldDefinition, OptionalSectionValue> {
  @property({ converter: Object })
  value: OptionalSectionValue;

  static get styles() {
    return [...super.styles, css`vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }
    .fs-nested-form {
      margin-top: 5px;
    }`];
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
    let errors = {}
    let form = selectedForm ? html`<div class="fs-nested-form">${createField(this.configuration, selectedForm, this.value.value, errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>` : html``;
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