import { createField, Field, ValueChangedEvent, FieldDefinition } from '@formsey/core';
import { css, customElement } from 'lit-element';

@customElement("formsey-form")
export class Form extends Field<FieldDefinition, Object> {
  static get styles() {
    return [...super.styles, css`
      :host {
      }`];
  }

  renderField() {
    return createField(this.configuration, this.definition, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), null);
  }
}