import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, CSSResult, customElement, html, LitElement, property, query, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-tgl")
export class Toggle extends LitElement {
  @property()
  id: string;

  @property()
  label: string | TemplateResult

  @property({ type: Boolean, reflect: true })
  selected: boolean

  @property({ type: Boolean })
  disabled: boolean = false

  @query("button")
  button: HTMLButtonElement

  static get styles(): CSSResult[] {
    return [css`
        :host {
            display: flex;
            align-items: center;
            flex-grow: 1;
            border: 1px solid var(--formsey-border);
            border-right-color: transparent;
            overflow: hidden;
            background-color: var(--formsey-widget-background);
        }
        :host([selected]) {
            background-color: var(--formsey-widget-background-hover, inherit);
            color: var(--formsey-accent-color);
        }
        :host(:focus-within) {
            border-color: var(--formsey-border-focus);
        }
        :host(:hover:not([disabled])) {
            background-color: var(--formsey-widget-background-hover, inherit);
        }
        button {
            display: flex;
            box-sizing: border-box;
            align-items: center;
            flex-grow: 1;
            justify-content: center;
            font:inherit;
            width: auto;
            overflow: visible;
            padding: var(--formsey-space-narrow);
            transition: all 0.12s;
            outline: none;
            border: none;
            margin: 0;
            border-radius: 0;
            background: none;
            color: inherit;
            cursor: pointer;
        }
        button:disabled {
            cursor: default;
            color: var(--formsey-color-disabled);
        }
        @media (pointer: coarse) {
            button {
              padding: .5em;
            }
            ::slotted(span) {
              display: none;
            }
        }`
    ]
  }

  render() {
    if (this.label) {
      return html`<button class='${this.selected ? "selected" : ""}' ?disabled="${this.disabled}" @click="${this.toggle}">${this.label}</button>`
    } else {
      return html`<button class='${this.selected ? "selected" : ""}' ?disabled="${this.disabled}" @click="${this.toggle}"><slot></slot></button>`
    }
  }

  focus() {
    this.button.focus()
  }

  private toggle(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.selected) {
      this.selected = true;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent("toggleSelected", { detail: { id: this.id } }))
    } else {
      this.dispatchEvent(new CustomEvent("selectedToggleClicked", { detail: { id: this.id } }))
    }
  }
}

@customElement("formsey-tgls")
export class Toggles extends LitElement {
  @property()
  set selected(selected: string) {
    for (let toggle of this.toggles) {
      toggle.selected = toggle.id == selected
    }
    if (this._selected != selected) {
      this._selected = selected
    }
  }

  get selected() {
    return this._selected
  }

  get toggles(): Toggle[] {
    return Array.from(this.querySelectorAll('fs-toggle'))
  }

  @query("slot")
  private _slot: HTMLSlotElement
  private _selected: string

  static get styles(): CSSResult[] {
    return [css`
        :host {
            display: inline-flex;
            flex-direction: row;
            height: var(--formsey-input-height, 2em);
        }
        ::slotted(:first-child) {
            border-top-left-radius: var(--formsey-border-radius);
            border-bottom-left-radius: var(--formsey-border-radius);
        }
        ::slotted(:last-child) {
            border-top-right-radius: var(--formsey-border-radius);
            border-bottom-right-radius: var(--formsey-border-radius);
            border-right-color: var(--formsey-border);
        }
        ::slotted(:last-child:focus-within) {
            border-right-color: var(--formsey-border-focus);
        }
        @media (pointer: coarse) {
            :host {
                margin: 0.25em;
            }
        }
        `]
  }

  render() {
    return html`<slot></slot>`
  }

  focus() {
    (<HTMLElement>this._slot.assignedElements()[0]).focus()
  }

  focusLast() {
    (<HTMLElement>this._slot.assignedElements()[this._slot.assignedElements().length - 1]).focus()
  }

  getToggle(id: string): Toggle | undefined {
    return this.toggles.find(toggle => toggle.id == id);
  }

  firstUpdated() {
    this._slot.addEventListener("slotchange", e => this.slotChanged(e))
  }

  hasTab(id: string): boolean {
    return this.toggles.filter(tab => tab.id === id).length > 0;
  }

  private slotChanged(e: Event) {
    this._slot.assignedNodes().forEach(nestedToggle => {
      if (nestedToggle instanceof Toggle) {
        if (!nestedToggle.getAttribute("observed")) {
          nestedToggle.setAttribute("observed", "observed")
          nestedToggle.addEventListener("toggleSelected", (e: CustomEvent) => this.toggleSelected(e))
          nestedToggle.addEventListener("keydown", (e: KeyboardEvent) => { this.keyDown(e) })
        }
        if (nestedToggle.selected && this._selected != nestedToggle.id) {
          this.selected = nestedToggle.id
        }
      }
    })
    this.requestUpdate();
  }

  private toggleSelected(e: CustomEvent) {
    this.selected = e.detail.id
    this.dispatchEvent(new CustomEvent("select", { detail: this.selected }))
    for (let toggle of this.toggles) {
      if (toggle.selected && this._selected != e.detail.id) {
        toggle.selected = false;
      }
    }
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
@customElement("formsey-toggle")
export class ToggleField extends LabeledField<ToggleFieldDefinition, string> {
  @property({ converter: Object })
  value: string;

  renderField() {
    const buttons = []
    for (let i = 0; i < this.definition.buttons?.length; i++) {
      const button = this.definition.buttons[i]
      const icon = typeof button.icon == "string" ? getIcon(button.icon as string) : button.icon
      buttons.push(html`<formsey-tgl id=${button.name} ?selected=${button.name == this.value} .label=${button.text}>${icon}</formsey-tgl>`)
    }
    return html`<formsey-tgls @select=${this.select}>${buttons}</formsey-tgls>`
  }

  private select(e: CustomEvent) {
    this.value = e.detail
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }
}

getLibrary("native").registerComponent("toggle", {
  importPath: "@formsey/fields-native/ToggleField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ToggleFieldDefinition, string>) => {
    return html`<formsey-toggle id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-toggle>`
  }
})