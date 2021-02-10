import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export interface SourceCodeFieldDefinition extends InputFieldDefinition {
  theme?: string
  mode?: string
  gutter?: boolean
  height?: number
}
@customElement("formsey-sourcecode")
export class SourceCodeField extends LabeledField<SourceCodeFieldDefinition, string> {
  @property({ type: String })
  value: string

  @query("fs-ace")
  editor: Ace

  protected renderField() {
    return html`
    <style>
      fs-ace {
        flex-grow: 1;
        --fs-token-invisible: var(--formsey-token-invisible, #bfbfbf);
        --fs-token-keyword: var(--formsey-token-keyword, #569CD6);
        --fs-token-constant: var(--formsey-token-constant, #06960e);
        --fs-token-language:  var(--formsey-token-language, #569CD6);
        --fs-token-library:  var(--formsey-token-library, #06960e);
        --fs-token-invalid:  var(--formsey-token-invalid, #F44747);
        --fs-token-operator:  var(--formsey-token-operator, #D4D4D4);
        --fs-token-function:   var(--formsey-token-function, #3c4c72);
        --fs-token-type: var(--formsey-token-type, #6d79de);
        --fs-token-string:  var(--formsey-token-string, #ce9178);
        --fs-token-comment:  var(--formsey-token-comment, #6A9955);
        --fs-token-tag:  var(--formsey-token-tag, #569CD6);
        --fs-token-numeric: var(--formsey-token-numeric, #B5CEA8);
        --fs-token-variable:  var(--formsey-token-variable, #9cdcfe);
        --fs-marker-step:  var(--formsey-marker-step, #fcff00);
        --fs-marker-stack:  var(--formsey-marker-stack, #a4e565);
        --fs-marker-selection:  var(--formsey-marker-selection, #3a3d4166);
        --fs-marker-selected-word:  var(--formsey-marker-selected-word, #3a3d41);
        --fs-text-color: var(--formsey-color, #3a3d41);
    }
    </style>
    <fs-ace class="input" style="min-height:${ifDefined(this.definition.height)}" .value=${this.value} ?gutter="${this.definition.gutter}" mode="${ifDefined(this.definition.mode)}" theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @change=${this.changed} @focus="${this.focused}" @blur="${this.blurred}"></fs-ace>`;
  }

  focusField() {
    if (this.editor) {
      this.editor.focus()
    }
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value));
    }
  }
}

getLibrary("native").registerComponent("sourceCode", {
  importPath: "@formsey/fields-native-extended/SourceCodeField",
    template: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<SourceCodeFieldDefinition, string> ) => {
    return html`<formsey-sourcecode id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-sourcecode>`
  }
})