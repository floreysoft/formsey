import { Ace } from '@floreysoft/ace';
import { ChangeEvent, InputFieldDefinition, LabeledField } from '@formsey/core';
import { customElement, html, property, query } from 'lit-element';

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

  protected renderField() {
    return html`<floreysoft-ace class="input" .value=${this.value} ?gutter="${this.definition.gutter}" .mode="${this.definition.mode}" .theme="${this.definition.theme}" ?readonly="${this.definition.readonly}" @changed=${this.changed}></floreysoft-ace>`;
  }

  protected changed(e: any) {
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }
}