import { KEYCODE } from '@floreysoft/utils';
import { ButtonFieldDefinition, FieldClickEvent, LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { classMap } from 'lit/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-button")
export class ButtonField extends LabeledField<ButtonFieldDefinition, void> {
  @query("button")
  button: HTMLButtonElement | undefined

  renderField() {
    if (this.definition) {
      const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
      return html`<button class=${classMap({ left: this.definition.align == "left" })} type="${this.definition.buttonType || "button"}" @click=${this.clicked} @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}" title=${ifDefined(this.definition.tooltip)} @keydown=${this.keyDown}>${icon}${this.definition.text ? html`<span>${this.definition.text}</span>` : undefined}</button>`;
    }
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

  protected clicked(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.dispatchEvent(new FieldClickEvent(this.path()));
  }

  focusField(): boolean {
    this.button?.focus()
    return true
  }
}

getLibrary("native").registerComponent("button", {
  importPath: "@formsey/fields-native/ButtonField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<ButtonFieldDefinition, boolean>) => {
    return html`<formsey-button id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @invalid=${invalidHandler} @click=${clickHandler}></formsey-button>`
  }
})
