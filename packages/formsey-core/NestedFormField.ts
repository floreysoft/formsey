import { createField, Field, NestedFormDefinition, ValueChangedEvent } from '@formsey/core';
import { css, customElement } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-nested-form")
export class NestedFormField extends Field<NestedFormDefinition, Object> {
  static get styles() {
    return [...super.styles, css`
      :host {

      }`];
  }

  renderField() {
    if ( !this.value ) {
      this.value = this.definition.default ? this.definition.default : {}
    }
    this.definition.form.name = this.definition.name
    return createField(this.configuration, this.definition.form, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  public checkValidity() {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    return child.checkValidity();
  }

  protected valueChanged(e: any) {
    e.stopPropagation()
    if (e.name == this.definition.form.name) {
      this.value = e.value;
      this.dispatchEvent(new ValueChangedEvent(this.definition.form.name, this.value));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors))
  }
}