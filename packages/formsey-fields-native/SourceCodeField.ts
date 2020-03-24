import '@floreysoft/ace';
import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField, ValueChangedEvent } from '@formsey/core';
import { css, customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export interface SourceCodeFieldDefinition extends InputFieldDefinition {
  theme? : string
  mode? : string
  gutter? : boolean
}

@customElement("formsey-sourcecode")
export class SourceCodeField extends LabeledField<SourceCodeFieldDefinition, string> {
  @property({ type: String })
  value : string

  @query("floreysoft-ace")
  editor : Ace

  static get styles() {
    return [...super.styles, css`
    floreysoft-ace {
      height: 100px;
      border-radius: var(--lumo-border-radius);
      border: 1px solid var(--lumo-contrast-20pct);
      margin: var(--lumo-space-xs) 0;
    }`]
  }

  protected renderField() {
    return html`<floreysoft-ace .value=${ifDefined(this.value)} ?gutter="${this.definition.gutter}" .mode="${ifDefined(this.definition.mode)}" ?readonly="${this.definition.readonly}" @changed=${this.valueChanged}></floreysoft-ace>`;
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