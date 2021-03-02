import { ButtonFieldDefinition, LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { KEYCODE } from '@floreysoft/utils';

@customElement("formsey-button")
export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
    return html`<button class=${classMap({ input: true, left: this.definition.align == "left" })} type="${this.definition.buttonType || "button"}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}" title=${ifDefined(this.definition.tooltip)} @keydown=${this.keyDown}>${icon}${this.definition.text ? html`<span>${this.definition.text}</span>` : undefined}</button>`;
  }

  keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.SPACE:
      case KEYCODE.RETURN:
        e.preventDefault()
        e.stopPropagation()
        this.clicked(e)
    }
  }

  focusField(): boolean {
    this.button.focus()
    return true
  }
}

getLibrary("native").registerComponent("button", {
  importPath: "@formsey/fields-native/ButtonField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<ButtonFieldDefinition, boolean>) => {
    return html`<formsey-button id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler} @click=${clickHandler}></formsey-button>`
  }
})
