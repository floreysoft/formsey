import { LitElement, html, property, customElement } from 'lit-element';
import { ValueChangedEvent } from './ValueChangedEvent';
import { FieldFactory, FieldDefinition } from './FieldDefinitions';

@customElement("fs-form")
export class Form extends LitElement {
  @property({ converter: Object })
  definition: FieldDefinition

  @property({ converter: Object })
  set value(value : Object) {
    this._value = value
    this.requestUpdate()
  }

  get value() {
    return this._value
  }

  factory: FieldFactory

  _value : any

  async fetchDefinition(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.definition = data
    } catch (reason) {
      console.error(reason.message)
    }
  }


  @property()
  set src(url: string) {
    // TODO: Create webpack loader to download and inline form definition
    this.fetchDefinition(url);
  }

  render() {
    // TODO: Code splitting and dynamic bundle loading
    if (this.definition) {
      return html`<style>
      :host {
        display: block;
      }
      </style>
      ${this.factory.create(this.definition, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event))}`;
    } else {
      return html``
    }
  }

  valueChanged(e: ValueChangedEvent<any>): void {
    this._value = e.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}