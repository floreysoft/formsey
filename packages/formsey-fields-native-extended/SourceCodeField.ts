import { Ace } from '@floreysoft/ace';
import { ChangeEvent, InputFieldDefinition, LabeledField, register } from '@formsey/core';
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export interface SourceCodeFieldDefinition extends InputFieldDefinition {
  theme? : string
  mode? : string
  gutter? : boolean
  height?: number
}

export class SourceCodeField extends LabeledField<SourceCodeFieldDefinition, string> {
  @property({ type: String })
  value : string

  @query("fs-ace")
  editor : Ace

  protected renderField() {
    return html`<fs-ace class="input" style="height:${ifDefined(this.definition.height)}" .value=${this.value} ?gutter="${this.definition.gutter}" mode="${ifDefined(this.definition.mode)}" theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @change=${this.changed}></fs-ace>`;
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent("input", this.definition.name, this.value));
    }
  }
}
register("formsey-sourcecode", SourceCodeField)