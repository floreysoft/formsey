import { ButtonFieldDefinition, LabeledField } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';

export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button class="input" type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}">${this.definition.text}</button>`;
  }

  focusField() : boolean {
    this.button.focus()
    return true
  }
}
register({
  type: "boolean",
  tag: "formsey-button",
  constructor: ButtonField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/ButtonField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-button id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-button>`
  }
})