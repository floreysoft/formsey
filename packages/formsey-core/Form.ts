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
    return createField(this.configuration, this.definition, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  public checkValidity() {
    this.errors = {}
    let child = this.renderRoot.firstElementChild as Field<any, any>
    return child.checkValidity();
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected invalid(e: InvalidEvent) {
    console.log("Form received invalid event, combining events and throws event="+JSON.stringify(e))
    e.stopPropagation()
    this.errors = e.errors
    this.dispatchEvent(new InvalidEvent(e.errors));
  }
}