import { KEYCODE } from '@floreysoft/utils';
import { Field } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { Option } from '@formsey/core/FieldDefinitions';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';


@customElement("formsey-option")
export class OptionField extends Field<Option, boolean> {
  @property({ type: Boolean })
  hideCheckmark: boolean = false

  @property({ type: Boolean })
  passive: boolean = false

  @property()
  query: string = ""

  @query("button")
  button: HTMLElement | undefined

  render() {
    if (this.definition) {
      const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
      return html`<button type="button" @keydown=${this.keyDown} @click=${this.clicked} class=${classMap({ left: true, c: !!this.value })} tabindex="0">
    ${this.hideCheckmark ? undefined : html`<div class="cm">${this.value ? getIcon("Checkmark") : undefined}</div>`}
    ${icon ? html`<div class="icon">${icon}</div>` : ""}
    <div class="label">${this.definition.label ? this.highlight(this.definition.label) : ""}</div>
    </button>`;
    }
  }

  protected focusField(path?: string) {
    this.button?.focus()
  }

  protected clicked(e: Event) {
    e.stopPropagation()
    if (!this.passive) { this.value = !this.value }
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  private highlight(label: string) {
    if (this.query && label.toLowerCase().startsWith(this.query.toLowerCase())) {
      return html`<b>${label.substring(0, this.query.length)}</b>${label.substring(this.query.length)}`
    } else {
      return label
    }
  }

  private keyDown(e: KeyboardEvent) {
    if (e.keyCode == KEYCODE.RETURN) {
      e.preventDefault()
      this.clicked(e)
    }
  }
}

getLibrary("native").registerComponent("option", {
  importPath: "@formsey/fields-native/OptionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler }: Resources<Option, boolean>) => {
    return html`<formsey-option .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-option>`
  }
})