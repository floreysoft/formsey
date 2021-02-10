import { KEYCODE } from '@floreysoft/utils';
import { Field, ValueChangedEvent } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { Option } from '@formsey/core/FieldDefinitions';
import { customElement, html, property, query } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

@customElement("formsey-option")
export class OptionField extends Field<Option, boolean> {
  @property({ type: Boolean })
  hideCheckmark: boolean

  @property()
  query: string

  @query("button")
  button: HTMLElement

  render() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
    return html`<button type="button" @keydown=${this.keyDown} @click=${this.clicked} class=${classMap({ c: this.value })} tabindex="0">${this.hideCheckmark ? undefined : html`<div class="cm">${this.value ? getIcon("Checkmark") : undefined}</div>`}${icon ? html`<div class="icon">${icon}</div>` : ""}<div class="label">${this.definition.label ? this.highlight(this.definition.label) : ""}</div></button>`;
  }

  protected focusField(path?: string) {
    this.button.focus()
  }

  protected clicked(e: Event) {
    e.stopPropagation()
    this.value = !this.value
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }

  private highlight(label) {
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
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler }: Resources<Option, boolean>) => {
    return html`<formsey-option .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-option>`
  }
})