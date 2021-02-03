import { createField, Field } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { FormDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, CSSResult, customElement, html, LitElement, property, query, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { classMap } from 'lit-html/directives/class-map';
import { getIcon } from '../formsey-core/Components';
@customElement("formsey-tab")
export class Tab extends LitElement {
  @property()
  id: string;

  @property()
  label: string;

  @property({ type: Boolean, reflect: true })
  selected: boolean

  @property()
  icon: TemplateResult

  static get styles(): CSSResult[] {
    return [css`
        :host {
            display: none;
            flex-grow: 1;
            flex-direction: column;
        }
        :host([selected]) {
            display: flex;
        }
        `]
  }

  render() {
    if (!this.id) {
      this.id = this.label
    }
    return html`<slot></slot>`
  }
}

@customElement("formsey-tabs")
export class Tabs extends LitElement {
  @property()
  set selected(selected: string) {
    for (let tab of this.tabs) {
      tab.selected = tab.id === selected
    }
    if (this._selected != selected) {
      this._selected = selected
      this.requestUpdate()
    }
  }

  get selected() {
    return this._selected
  }

  get tabs(): Tab[] {
    return this._tabs
  }

  @property({ type: Boolean })
  expand: boolean = false

  @property({ type: Boolean })
  bottom: boolean = false

  @query(".selected")
  private _selectedTab: HTMLElement

  @query("slot")
  private _slot: HTMLSlotElement
  private _selected: string
  private _tabs: Tab[]

  private readonly KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35,
    SPACE: 32,
    RETURN: 13
  }

  static get styles(): CSSResult[] {
    return [css`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        * {
            box-sizing: border-box;
        }
        .container {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: hidden;
            border-bottom-left-radius: var(--formsey-border-radius);
            border-bottom-right-radius: var(--formsey-border-radius);
        }
        .tabs {
            display: flex;
            flex-wrap: wrap;
            position: relative;
        }
        .tab {
            display: flex;
            padding: var(--formsey-space-wide);
            align-items: center;
            text-align: center;
            cursor: pointer;
            outline: none;
            overflow: hidden;
            background-color: var(--formsey-widget-background);
            border: 1px solid transparent;
            transition: all 0.12s ease-out;
            color: var(--formsey-color);
        }
        .top .tab {
          border-top-left-radius: var(--formsey-border-radius);
          border-top-right-radius: var(--formsey-border-radius);
        }
        .horizontal .tab:focus-within {
            border: 1px solid var(--formsey-border-focus, inherit);
        }
        .tab:hover {
            color:  var(--formsey-color, inherit);
            background-color: var(--formsey-widget-background-hover);
        }
        .tab.expand {
          flex-grow: 1;
          justify-content: center;
          text-align: center;
        }
        .tab.selected {
            color:  var(--formsey-accent-color, inherit);
            background-color: var(--formsey-widget-background-hover, inherit);
        }
        .tab .icon {
            display: flex;
            margin: 0 .2em;
        }
        .tab fs-icon {
            width: 1.15em;
            height: 1.15em;
            margin-right: .2em;
        }
        .vertical .tab fs-icon {
            width: 1.5em;
            height: 1.5em;
            margin: .5em;
        }
        .content {
            flex-grow: 1;
            display: flex;
        }
        .collapsed {
            display: none;
        }
        ::slotted(formsey-tab) {
            max-width: 100%;
        }
        @media (pointer: coarse) {
            .tab {
                min-height: 2.5em;
            }
        }`]
  }

  render() {
    let templates: TemplateResult[] = [];
    if (this.tabs) {
      for (let tab of this.tabs) {
        let label = tab.label ? html`<div class="label">${tab.label}</div>` : undefined
        const icon = typeof tab.icon == "string" ? getIcon(tab.icon as string) : tab.icon
        templates.push(html`<div part="tab" tabIndex="0" @keydown=${(e: KeyboardEvent) => this.keyDown(e, tab)} @click=${(e: Event) => { this.select(tab.id) }} class="${classMap({ tab: true, selected: tab.selected, expand: this.expand })}">${icon}${label}</div>`)
      }
    }
    return html`<div class="container">${this.bottom ? html`<div class="content"><slot></slot></div><div part="tabs" class="tabs bottom">${templates}</div>` : html`<div part="tabs" class="tabs top">${templates}</div><div class="content"><slot></slot></div>`}</div>`
  }

  firstUpdated() {
    this._slot.addEventListener("slotchange", e => this.slotChanged(e))
    this._tabs = Array.from(this._slot.assignedElements()) as Tab[]
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('focusAbove', this.focus)
  }

  focus() {
    this._selectedTab?.focus()
  }

  select(id: string) {
    this.dispatchEvent(new CustomEvent("select", { detail: { id, previousId: this.selected } }))
    this.selected = id
  }

  private slotChanged(e: Event) {
    this._tabs = Array.from(this._slot.assignedElements()) as Tab[]
    for (let tab of this.tabs) {
      if (tab.selected && this._selected != tab.id) {
        this.selected = tab.id
        return true;
      }
    }
    this.requestUpdate();
    return true;
  }

  private keyDown(event: KeyboardEvent, tab: Tab) {
    // if (event.altKey) return;
    let newTab: HTMLElement | null
    let newTarget: HTMLElement | null = event.currentTarget as HTMLElement
    switch (event.keyCode) {
      case this.KEYCODE.SPACE:
      case this.KEYCODE.RETURN:
        newTab = tab
        this.selected = newTab.id
        break;
      case this.KEYCODE.LEFT:
      case this.KEYCODE.UP:
        newTab = tab.previousElementSibling as HTMLElement
        newTarget = newTarget ? newTarget.previousElementSibling as HTMLElement : null
        if (!newTarget) {
          this.dispatchEvent(new CustomEvent('focusLeft', { bubbles: true, composed: true }))
        }
        break;
      case this.KEYCODE.RIGHT:
      case this.KEYCODE.DOWN:
        newTab = tab.nextElementSibling as HTMLElement
        newTarget = newTarget ? newTarget.nextElementSibling as HTMLElement : null
        if (!newTarget) {
          this.dispatchEvent(new CustomEvent('focusRight', { bubbles: true, composed: true }))
        }
        break;
      case this.KEYCODE.HOME:
        newTab = tab.parentElement ? (<HTMLElement>tab.parentElement).firstElementChild as HTMLElement : null
        newTarget = newTarget ? newTarget.parentElement ? (<HTMLElement>newTarget.parentElement).firstElementChild as HTMLElement : null : null
        break;
      case this.KEYCODE.END:
        newTab = tab.parentElement ? (<HTMLElement>tab.parentElement).lastElementChild as HTMLElement : null
        newTarget = newTarget ? newTarget.parentElement ? (<HTMLElement>newTarget.parentElement).lastElementChild as HTMLElement : null : null
        break;
      case this.KEYCODE.DOWN:
        let selectedTab = this.tabs.find(tab => tab.id == this.selected)?.firstElementChild
        if (selectedTab) {
          (<HTMLElement>selectedTab).focus()
        }
        break;
      default:
        return;
    }
    if (newTab) {
      if (newTarget != null) {
        newTarget.focus()
      }
      event.preventDefault();
    }
  }
}

@customElement("formsey-tab-panel")
export class TabsField extends Field<TabsFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  render() {
    const tabs = []
    this.definition.selections.forEach((selection, index) => {
      const icon: TemplateResult = typeof selection.icon == "string" ? getIcon(selection.icon as string) : selection.icon as TemplateResult
      tabs.push(html`<formsey-tab id=${selection.label} label=${selection.label} .icon=${icon} ?selected=${ index == 0}>${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</formsey-tab>`)
    })
    return html`<formsey-tabs ?bottom=${this.definition.location == "bottom"} ?expand=${this.definition.expand}>${tabs}</formsey-tabs>`
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    if (e.detail?.name) {
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
    }
  }
}

getLibrary("native").registerComponent("tabs", {
  importPath: "@formsey/fields-native/TabsField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<TabsFieldDefinition, Object>) => {
    return html`<formsey-tab-panel id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-tab-panel>`
  }
})