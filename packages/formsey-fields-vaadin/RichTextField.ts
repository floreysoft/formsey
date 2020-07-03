import { InputFieldDefinition, LabeledField, ChangeEvent, register } from '@formsey/core';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor.js';
import { html, property } from 'lit-element';

export class RichTextField extends LabeledField<InputFieldDefinition, string> {
  @property()
  value: string;

  renderField() {
    return html`<vaadin-rich-text-editor style="display:flex" theme="compact" @change="${this.changed}" name="${this.definition.name}" ?disabled=${this.definition.disabled} value="<p>Hallo</p>"></vaadin-rich-text-editor>`;
  }

  protected changed(e: any) {
    this.value = e.currentTarget.htmlValue;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
    }
  }
}

register(["native", "material","vaadin"], "richText", "formsey-rich-text-vaadin", RichTextField);
