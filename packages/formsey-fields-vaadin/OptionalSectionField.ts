import { createField, LabeledField, OptionalSectionFieldDefinition, ValueChangedEvent } from '@formsey/core';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-optional-section-vaadin")
export class OptionalSectionField extends LabeledField<OptionalSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object

  renderField() {
    let checked = false
    if ( this.value ) {
      checked = true
    }
    this.definition.form.name = this.definition.name
    let form = checked ? html`<div class="fs-nested-form">${createField(this.configuration, this.definition.form, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>` : undefined;
    return html`<vaadin-checkbox-group label="${this.definition.prompt}" theme="vertical"><vaadin-checkbox @change="${this.selectionChanged}" ?disabled="${ifDefined(this.definition.disabled)}" ?required="${this.definition.required}" .checked=${checked} value="optional">${this.definition.label ? this.definition.label : this.definition.prompt}</vaadin-checkbox></vaadin-checkbox-group>
    ${form}`;
  }

  protected selectionChanged(e: any) {
    this.value = e.currentTarget.checked ? {} : undefined
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected valueChanged(e: any) {
    this.value = e.value;
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.name, this.value));
  }
}