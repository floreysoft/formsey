import '@floreysoft/ace';
import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField, ChangeEvent } from '@formsey/core';
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
      height: 150px;
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid var(--formsey-input-border-color, #d5d5d5);
      overflow: hidden;
    }

    floreysoft-ace:focus-within {
      border: 1px solid var(--formsey-primary-color,  #020b2f);
    }
    `]
  }

  protected renderField() {
    return html`<floreysoft-ace .value=${ifDefined(this.value)} ?gutter="${this.definition.gutter}" .mode="${ifDefined(this.definition.mode)}" .theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @changed=${this.changed}></floreysoft-ace>`;
  }

  protected changed(e: any) {
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }

  resize() {
    if (this.editor) {
      this.editor.resize()
    }
  }
}