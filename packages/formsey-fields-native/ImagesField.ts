import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { ChangeEvent, ImagesFieldDefinition, LabeledField, register } from '@formsey/core';
import { css, html, LitElement, property, query, queryAll, TemplateResult } from 'lit-element';
import ResizeObserver from 'resize-observer-polyfill';

export class ImageCheckbox extends LitElement {
  static get styles() {
    return css`
    :host {
      display: inline-block;
      position: relative;
    }
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      height: auto;
      opacity: .9;
      transition: opacity 0.2s ease-out, transform .2s;
      transform-origin: 50% 50%;
    }
    img:hover {
      opacity: .95;
    }
    :checked+label>img {
      opacity: 1;
    }
    label {
      display: flex;
      flex-direction: column;
      position: relative;
      cursor: pointer;
      user-select: none;
      transition: transform .2s;
      line-height: 0;
    }
    label::after {
      content: ' ';
      color: var(--formsey-text-color, var(--fs-accent-color-text, #ffffff));
      background-color: var(--formsey-background-color, var(--fs-background-color, inherit));
      border-radius: 50%;
      position: absolute;
      right: .25em;
      top: .25em;
      width: 1em;
      height: 1em;
      text-align: center;
      line-height: 1em;
      transform-origin: 50% 50%;
      display:none;
      box-shadow: var(--formsey-box-shadow, var(--fs-box-shadow));
    }
    :checked+label>img {
      box-shadow: 0px 0px 3px 0 var(--fs-text-color);
    }
    :focus+label {
      transform: scale(.95);
    }
    :checked+label {
      transform: scale(.9);
    }
    :focus+label>img {
      box-shadow: 0px 0px 3px 0 var(--fs-border-color-focus);
      opacity: .9;
    }
    :checked+label::after {
      display:block;
    }
    `
  }

  @property({ type: Boolean })
  required: boolean;

  @property({ type: Boolean })
  disabled: boolean;

  @property({ type: Boolean })
  checked: boolean;

  @property({ type: String })
  src: string

  @property({ type: String })
  alt: string

  @property({ type: Number })
  tabIndex: number


  @query("input[type='checkbox']")
  checkbox: HTMLInputElement

  render() {
    return html`<input id="${this.id}" tabindex="${this.tabIndex}" type="checkbox" @keydown="${this.keyDown}" @click="${this.clicked}" ?checked="${this.checked}" ?disabled="${this.disabled}" ?required="${this.required}"><label for="${this.id}"><img src="${this.src}" alt="${this.alt}" /><slot></slot></label>`;
  }

  updated() {
    this.checkbox.checked = this.checked
  }

  focus() {
    this.checkbox.focus()
  }

  clicked(e: Event) {
    this.checked = this.checkbox.checked;
    this.dispatchEvent(new ChangeEvent(this.id, this.checkbox.checked));
  }

  private keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.RETURN:
        this.checkbox.checked = !this.checkbox.checked
        this.clicked(e)
        break
    }
  }
}
register("formsey-image-checkbox", ImageCheckbox)

export class ImagesField extends LabeledField<ImagesFieldDefinition, string[] | string> {
  @property({ type: Object })
  set definition(definition: ImagesFieldDefinition) {
    this._definition = definition
    if (this.images) {
      this.calculateColumns(this.images.offsetWidth)
    }
  }

  get definition() {
    return this._definition
  }

  @property({ type: Array })
  value: string[] | string

  @property({ type: Number })
  columns: number = 5

  @queryAll("formsey-image-checkbox")
  checkboxes: ImageCheckbox[]

  @query(".images")
  images: HTMLElement

  columnWidth: number

  ro: ResizeObserver

  _definition: ImagesFieldDefinition

  static get styles() {
    return [...super.styles, css`
      formsey-image-checkbox {
        width: 100%;
        height: auto;
      }

      .images {
          column-gap: 0px;
          line-height: 0;
      }

      .display {
        line-height: 1.15;
        margin-bottom: .5em;
      }
    `]
  }

  constructor() {
    super()
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.calculateColumns(entry.contentRect.width)
      }
    });
  }

  renderField() {
    if (!this.value) {
      this.value = []
    }
    let templates: TemplateResult[] = [];
    if (this.definition.images) {
      for (let i = 0; i < this.definition.images.length; i++) {
        const image = this.definition.images[i]
        const value = typeof image.value !== "undefined" ? image.value : image.label;
        const checked = this.definition.multiple ? this.value.includes(value) : this.value === value
        const label = image.label ? html`<div class="help-text display">${image.label}</div>` : undefined
        templates.push(html`<formsey-image-checkbox @keydown="${this.keyDown}" id="${value}" ?checked="${checked}" @change="${this.changed}" src="${image.src}" alt="${image.alt}" label="${image.label}" .tabIndex="${i == 0 ? 0 : -1}">${label}</formsey-image-checkbox>`);
      }
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<div class="images" style="columns:${this.columns} auto">${templates}</div>`;
  }

  firstUpdated() {
    this.ro.observe(this.images)
  }

  focusField(path: string) {
    if (path == this.definition.name) {
    }
  }

  changed(e: CustomEvent) {
    if (this.definition.multiple) {
      let value = []
      this.checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          value.push(checkbox.id)
        }
      })
      this.value = value
    } else {
      this.value = e.detail.value ? e.detail.name : undefined
    }
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }

  private keyDown(e: KeyboardEvent) {
    if (!e.ctrlKey && !e.altKey) {
      const left = (<HTMLElement>e.currentTarget).getBoundingClientRect().left
      const top = (<HTMLElement>e.currentTarget).getBoundingClientRect().top
      const height = (<HTMLElement>e.currentTarget).getBoundingClientRect().height
      switch (e.keyCode) {
        case KEYCODE.LEFT:
          e.stopPropagation();
          let onTheLeft = this.shadowRoot.elementFromPoint(left - 10, top + height / 2)
          if (onTheLeft) {
            (<HTMLElement>onTheLeft).focus()
          } else {
            this.dispatchEvent(new CustomEvent('focusLeft', { bubbles: true, composed: true }))
          }
          break;
        case KEYCODE.RIGHT:
          e.stopPropagation()
          let onTheRight = this.shadowRoot.elementFromPoint(left + this.columnWidth + 10, top + height / 2)
          if (onTheRight) {
            (<HTMLElement>onTheRight).focus()
          } else {
            this.dispatchEvent(new CustomEvent('focusRight', { bubbles: true, composed: true }))
          }
          break
        case KEYCODE.UP:
          e.stopPropagation()
          e.preventDefault()
          if (!walkAndFocus((<HTMLElement>e.currentTarget), "l")) {
            this.dispatchEvent(new CustomEvent('focusAbove', { bubbles: true, composed: true }))
          }
          break
        case KEYCODE.DOWN:
          e.stopPropagation()
          e.preventDefault()
          if (!walkAndFocus((<HTMLElement>e.currentTarget), "r")) {
            this.dispatchEvent(new CustomEvent('focusBelow', { bubbles: true, composed: true }))
          }
          break
      }
    }
  }

  private calculateColumns(availableWidth: number) {
    const columnWidth = this.definition?.columnWidth ? this.definition?.columnWidth : 150
    const minColumns = this.definition?.minColumns ? this.definition?.minColumns : 1
    const maxColumns = this.definition?.maxColumns ? this.definition?.maxColumns : 4
    let columns = Math.round(availableWidth / columnWidth)
    columns = Math.min(columns, maxColumns)
    columns = Math.max(columns, minColumns)
    this.columnWidth = availableWidth / columns
    this.columns = columns
  }
}
register("formsey-images", ImagesField)