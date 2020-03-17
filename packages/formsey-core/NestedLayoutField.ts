import { createField, NestedFormField, ValueChangedEvent } from '@formsey/core';
import { customElement } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-nested-layout")
export class NestedLayoutField extends NestedFormField {
  renderField() {
    if ( !this.value ) {
      this.value = {}
    }
    return createField(this.configuration, this.definition.form, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }
}