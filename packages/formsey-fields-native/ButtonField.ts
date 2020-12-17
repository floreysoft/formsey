import { ButtonFieldDefinition, LabeledField } from '@formsey/core';
import { Components, getLibrary, Settings, getIcon } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-button")
export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    return html`<button class="input" type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}">${getIcon(this.definition.icon)}${this.definition.text ? html`<span>${this.definition.text}</span>` : undefined}</button>`;
  }

  focusField() : boolean {
    this.button.focus()
    return true
  }
}

getLibrary("native").registerComponent("button", {
  importPath: "@formsey/fields-native/ButtonField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-button id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-button>`
  }
})