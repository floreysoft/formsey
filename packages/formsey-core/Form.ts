import { createField, Field, ValueChangedEvent, FieldDefinition } from '@formsey/core';
import { css, customElement } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-form")
export class Form extends Field<FieldDefinition, Object> {
  static get styles() {
    return [...super.styles, css`
      :host {
      }`];
  }

  renderField() {
    return createField(this.configuration, this.definition, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    if ( this.definition.name ) {
      e.prependPath(this.definition.name)
    }
    this.dispatchEvent(e);
  }
}