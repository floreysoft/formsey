import { createField, NestedFormField, ValueChangedEvent } from '@formsey/core';
import { customElement } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-form")
export class Form extends NestedFormField {
  renderField() {
    return createField(this.configuration, this.definition, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  protected valueChanged(e: ValueChangedEvent<any>) {
    this.value = e.value;
    this.dispatchEvent(new ValueChangedEvent(e.name, this.value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.errors = e.errors
    this.dispatchEvent(new InvalidEvent(e.errors));
  }
}