import { createField, Field, ValueChangedEvent, NestedFormDefinition } from '@formsey/core';
import { css, property, customElement } from 'lit-element';

@customElement("formsey-nested-form")
export class NestedFormField extends Field<NestedFormDefinition, Object> {
  @property({ converter: Object })
  value: Object;

  static get styles() {
    return [...super.styles, css`
      :host {

      }`];
  }

  renderField() {
    return createField(this.configuration, this.definition.form, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), null);
  }
}