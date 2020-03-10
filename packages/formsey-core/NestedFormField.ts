import { createField, Field, NestedFormDefinition, ValueChangedEvent } from '@formsey/core';
import { customElement } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-nested-form")
export class NestedFormField extends Field<NestedFormDefinition, Object> {
  value: Object = {}

  renderField() {
    if ( !this.value ) {
      this.value = this.definition.default ? this.definition.default : {}
    }
    this.definition.form.name = this.definition.name
    return createField(this.configuration, this.definition.form, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  public validate(report : boolean ) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if ( report ) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
  }

  protected valueChanged(e: any) {
    e.stopPropagation()
    let name = this.firstPathElement(e.name);
    if (name == this.definition.name) {
      this.value = e.value;
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    } else {
      this.value[name] = e.value[name];
      this.dispatchEvent(new ValueChangedEvent(undefined, this.value));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors))
  }
}