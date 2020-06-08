import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField, ChangeEvent } from '@formsey/core';
import { css, customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { INPUT_STYLE } from '@formsey/fields-native/styles';

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
    return [...super.styles, INPUT_STYLE, css`
    .input {
      height: 150px;
      padding: 0;
      overflow: hidden;
    }`]
  }

  protected renderField() {
    return html`<floreysoft-ace class="input" .value=${ifDefined(this.value)} ?gutter="${this.definition.gutter}" .mode="${ifDefined(this.definition.mode)}" .theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @changed=${this.changed}></floreysoft-ace>`;
  }

  protected changed(e: any) {
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }
}