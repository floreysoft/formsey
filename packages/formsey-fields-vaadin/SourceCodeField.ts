import { html, property, query, customElement } from 'lit-element';
import '@floreysoft/ace';
import { Ace } from '@floreysoft/ace';
import { Field, FieldDefinition, ValueChangedEvent } from '@formsey/core';

@customElement("formsey-sourcecode")
export class SourceCodeField extends Field<FieldDefinition, string> {
  @property({ type: String })
  value : string

  @query("floreysoft-ace")
  editor : Ace

  protected renderStyles() {
    return `
    floreysoft-ace {
      height: 100px;
      border-radius: var(--lumo-border-radius);
      border: 1px solid var(--lumo-contrast-20pct);
      margin: var(--lumo-space-xs) 0;
    }`
  }

  protected renderField() {
    return html`<floreysoft-ace .value=${this.value} @changed=${this.valueChanged}></floreysoft-ace>`;
  }

  protected valueChanged(e: any) {
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  resize() {
    if (this.editor) {
      this.editor.resize()
    }
  }
}