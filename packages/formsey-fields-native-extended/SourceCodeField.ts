import { Ace } from '@floreysoft/ace';
import { InputFieldDefinition, LabeledField } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
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

register({
  type: "sourcecode",
  tag: "formsey-sourcecode",
  constructor: SourceCodeField,
  libraries: ["material" ],
  importPath: "@formsey/fields-native-extended/SourceCodeField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-sourcecode id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-sourcecode>`
  }
})