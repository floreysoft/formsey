import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { LabeledField } from '@formsey/core';
import { ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { classMap } from "lit/directives/class-map";
import { ifDefined } from 'lit/directives/if-defined';

function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}

@customElement("formsey-toggle")
export class ToggleField extends LabeledField<ToggleFieldDefinition, string> {
  @property({ converter: String })
  value: string | undefined

  renderField() {
    assertIsDefined(this.definition)
    const buttons = []
    for (let i = 0; i < this.definition.buttons?.length; i++) {
      const button = this.definition.buttons[i]
      const icon = typeof button.icon == "string" ? getIcon(button.icon as string) : button.icon
      const text = button.text ? html`<span>${button.text}</span>` : undefined
      let color
      if (button.color) {
        color = `background-color:${button.color}`
      }
      buttons.push(html`<button type="button" class=${classMap({ left: button?.align == "left" })} style=${ifDefined(color)} ?selected=${button.name == this.value} ?disabled=${this.definition.disabled} @click=${(e: Event) => this.select(e, button.name)} @keydown=${this.keyDown}>${icon}${text}</button>`)
    }
    return html`<div @select=${this.select}>${buttons}</div>`
  }

  private select(e: Event, value?: string) {
    e.stopPropagation()
    if (!this.definition?.required && this.value == value) {
      this.value = undefined
    } else {
      this.value = value
    }
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
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
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ToggleFieldDefinition, string>) => {
    return html`<formsey-toggle id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-toggle>`
  }
})