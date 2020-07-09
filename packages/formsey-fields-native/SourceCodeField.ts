import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField, register, ValueChangedEvent } from '@formsey/core';
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
    return html`<fs-ace class="input" style="height:${ifDefined(this.definition.height)}" .value=${this.value} ?gutter="${this.definition.gutter}" mode="${ifDefined(this.definition.mode)}" theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @change=${this.changed} @focus="${this.focused}" @blur="${this.blurred}"></fs-ace>`;
  }

  focusField(path: string) {
    if (path == this.definition.name && this.editor) {
      this.editor.focus()
    }
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("input", this.definition.name, this.value));
    }
  }
}
register("formsey-sourcecode", SourceCodeField, ["native", "vaadin", "material"], "sourceCode",  "@formsey/fields-native/SourceCodeField")