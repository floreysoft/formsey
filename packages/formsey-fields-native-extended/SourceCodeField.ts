import { Ace } from '@floreysoft/ace';
import { FieldInputEvent, InputFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/Events';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { createComparator } from '@formsey/fields-native';


export interface SourceCodeFieldDefinition extends InputFieldDefinition {
  theme?: string
  mode?: string
  gutter?: boolean
  height?: number
}
@customElement("formsey-sourcecode")
export class SourceCodeField extends LabeledField<SourceCodeFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("fs-ace")
  editor: Ace | undefined

  protected renderField() {
    if (this.definition) {
      return html`
    <style>
      fs-ace {
        flex-grow: 1;
        --fs-token-invisible: var(--formsey-palette-1);
        --fs-token-language:  var(--formsey-palette-1);
        --fs-token-keyword: var(--formsey-palette-1);
        --fs-token-string: var(--formsey-palette-1);
        --fs-token-library: var(--formsey-palette-2);
        --fs-token-invalid: var(--formsey-palette-2);
        --fs-token-operator: var(--formsey-palette-2);
        --fs-token-function: var(--formsey-palette-2);
        --fs-token-type: var(--formsey-palette-2);
        --fs-token-comment: var(--formsey-palette-3);
        --fs-token-tag: var(--formsey-palette-3);
        --fs-token-numeric: var(--formsey-palette-3);
        --fs-token-variable: var(--formsey-palette-4);
        --fs-marker-step: var(--formsey-palette-4);
        --fs-marker-stack: var(--formsey-palette-4);
        --fs-marker-selection: var(--formsey-shade);
        --fs-marker-selected-word: var(--formsey-shade);
        --fs-token-constant: var(--formsey-text);
        --fs-text-color: var(--formsey-color);
    }
    </style>
    <fs-ace class="input" style="min-height:${ifDefined(this.definition.height)}" .value=${this.value} ?gutter="${this.definition.gutter}" mode="${ifDefined(this.definition.mode)}" theme="${ifDefined(this.definition.theme)}" ?readonly="${this.definition.readonly}" @change=${this.changed} @focus="${this.focused}" @blur="${this.blurred}"></fs-ace>`;
    }
  }

  focusField() {
    if (this.editor) {
      this.editor.focus()
    }
  }

  protected changed(e: any) {
    e.stopPropagation()
    const isSame = createComparator(this.value)
    this.value = e.detail.value;
    this.dispatchEvent(new FieldInputEvent(this.path(), this.value, !isSame(this.value)));
  }
}

getLibrary("native").registerComponent("sourceCode", {
  importPath: "@formsey/fields-native-extended/SourceCodeField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<SourceCodeFieldDefinition, string>) => {
    return html`<formsey-sourcecode id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-sourcecode>`
  }
})