import { createField, ValueChangedEvent } from '@formsey/core';
import { customElement, html, property } from 'lit-element';
import { FieldsField } from './FieldsField';
import { InvalidEvent } from './InvalidEvent';

@customElement("formsey-form")
export class FormField extends FieldsField {
  async fetchDefinition(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.definition = data
      this.requestUpdate();
    } catch (reason) {
      console.error(reason.message)
    }
  }

  @property()
  set src(url: string) {
    this.fetchDefinition(url);
  }

  renderStyles() {
    return `
      :host {
        display: inline-grid;
        width: 100%;
        grid-template-columns: 100%;
      }

      .fs-form-field {
        width: 100%;
      }`;
  }

  renderField() {
    return html`${this.definition.fields.map((field) => html`<div class='fs-form-field'>
    ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
    </div>`)}`
  }
}