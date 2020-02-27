import { FieldDefinition, LabeledField, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor.js';
import { customElement, html, property } from 'lit-element';

@customElement("formsey-rich-text-vaadin")
export class RichTextField extends LabeledField<FieldDefinition, string> {
  @property()
  value: string;

  renderField() {
    return html`<vaadin-rich-text-editor style="display:flex" theme="compact" @change="${this.valueChanged}" name="${this.definition.name}" ?disabled=${typeof this.definition.enabled == "undefined" ? false : !this.definition.enabled} value="<p>Hallo</p>"></vaadin-rich-text-editor>`;
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.htmlValue;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}