import { Ace } from '@floreysoft/ace';
import { ChangeEvent, InputFieldDefinition, LabeledField } from '@formsey/core';
import { customElement, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export interface SourceCodeFieldDefinition extends InputFieldDefinition {
  theme? : string
  mode? : string
  gutter? : boolean
  height?: number
}

@customElement("formsey-sourcecode")
export class SourceCodeField extends LabeledField<SourceCodeFieldDefinition, string> {
  @property({ type: String })
  value : string

  @query("floreysoft-ace")
  editor : Ace

  protected renderField() {
    return html`<floreysoft-ace class="input" style="height:${ifDefined(this.definition.height)}" .value=${this.value} ?gutter="${this.definition.gutter}" .mode="${this.definition.mode}" .theme="${this.definition.theme}" ?readonly="${this.definition.readonly}" @changed=${this.changed}></floreysoft-ace>`;
  }

  protected changed(e: any) {
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
    }
  }
}