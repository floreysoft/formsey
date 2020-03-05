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

  value: Object = {}

  renderField() {
    return createField(this.configuration, this.definition, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  public validate(report : boolean) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if ( report ) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
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