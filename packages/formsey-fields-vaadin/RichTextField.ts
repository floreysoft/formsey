import { InputFieldDefinition, LabeledField, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor.js';
import { customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-rich-text-vaadin")
export class RichTextField extends LabeledField<InputFieldDefinition, string> {
  @property()
  value: string;

  renderField() {
    return html`<vaadin-rich-text-editor style="display:flex" theme="compact" @change="${this.valueChanged}" name="${this.definition.name}" ?disabled=${ifDefined(this.definition.disabled)} value="<p>Hallo</p>"></vaadin-rich-text-editor>`;
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.htmlValue;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}