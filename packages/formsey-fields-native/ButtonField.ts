import { ButtonFieldDefinition, LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-button")
export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
    return html`<button class="input" type="${this.definition.buttonType || "button"}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}" title=${ifDefined(this.definition.tooltip)}>${icon}${this.definition.text ? html`<span>${this.definition.text}</span>` : undefined}</button>`;
  }

  focusField(): boolean {
    this.button.focus()
    return true
  }
}

getLibrary("native").registerComponent("button", {
  importPath: "@formsey/fields-native/ButtonField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<ButtonFieldDefinition, boolean>) => {
    return html`<formsey-button id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler} @click=${clickHandler}></formsey-button>`
  }
})
