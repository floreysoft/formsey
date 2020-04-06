import { createField, Field, FieldDefinition, ValueChangedEvent, FormField } from '@formsey/core';
import { customElement, queryAll } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-form")
export class Form extends Field<FieldDefinition, Object> {
  private resizeHandler = ((e: CustomEvent) => { this.resize(); if (e.detail) { this.requestUpdate() } })

  value: Object = {}

  @queryAll("formsey-form-field")
  protected _forms: HTMLElement[]

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("resizeForm", this.resizeHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("resizeForm", this.resizeHandler)
  }

  renderField() {
    let value = this.value
    if (this.definition.name && this.value && this.value[this.definition.name]) {
      value = this.value[this.definition.name]
    }
    return createField(this.configuration, this.definition, value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  updated() {
    this.updateComplete.then(() => {
      // Resize nested forms
      if (this._forms) {
        for (let form of this._forms) {
          (<FormField>form).resize()
          console.log("Form: Resize nested forms")
        }
      }
    })
  }

  public validate(report: boolean) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (report) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
  }

  protected valueChanged(e: ValueChangedEvent<any>) {
    this.value = e.value;
    if (e.name.startsWith('.')) {
      e.name = e.name.substring(1)
    }
    let value: any
    if (this.definition.name) {
      value = {}
      value[this.definition.name] = this.value
    } else {
      value = this.value
    }
    this.dispatchEvent(new ValueChangedEvent(e.name, value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.errors = e.errors
    this.dispatchEvent(new InvalidEvent(e.errors));
  }

  public resize() {
    this.requestUpdate()
  }
}