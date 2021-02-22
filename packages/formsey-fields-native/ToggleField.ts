import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { LabeledField } from '@formsey/core';
import { ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-toggle")
export class ToggleField extends LabeledField<ToggleFieldDefinition, string> {
  @property({ converter: Object })
  value: string;

  renderField() {
    const buttons = []
    for (let i = 0; i < this.definition.buttons?.length; i++) {
      const button = this.definition.buttons[i]
      const icon = typeof button.icon == "string" ? getIcon(button.icon as string) : button.icon
      let color
      if (button.color) {
        if (button.color.startsWith('palette')) {
          color = `var(--formsey-palette-${button.color})`
        } else {
          color = button.color
        }
      }
      buttons.push(html`<button type="button" style=${ifDefined(color)} ?selected=${button.name == this.value} ?disabled=${this.definition.disabled} @click=${(e: Event) => this.select(e, button.name)} @keydown=${this.keyDown}>${icon}<span>${button.text}</span></button>`)
    }
    return html`<div @select=${this.select}>${buttons}</div>`
  }

  private select(e: Event, value: string) {
    e.stopPropagation()
    this.value = value
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }

  private keyDown(e: KeyboardEvent) {
    if (!e.ctrlKey && !e.altKey) {
      switch (e.keyCode) {
        case KEYCODE.LEFT:
          if (!walkAndFocus((<HTMLElement>e.currentTarget), "l")) {
            this.dispatchEvent(new CustomEvent('focusLeft', { bubbles: true, composed: true }))
          }
          break;
        case KEYCODE.RIGHT:
          if (!walkAndFocus((<HTMLElement>e.currentTarget), "r")) {
            this.dispatchEvent(new CustomEvent('focusRight', { bubbles: true, composed: true }))
          }
          break
        case KEYCODE.UP:
          break
        case KEYCODE.DOWN:
          break
      }
    }
  }
}

getLibrary("native").registerComponent("toggle", {
  importPath: "@formsey/fields-native/ToggleField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ToggleFieldDefinition, string>) => {
    return html`<formsey-toggle id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-toggle>`
  }
})