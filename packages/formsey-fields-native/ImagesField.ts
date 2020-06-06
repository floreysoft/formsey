import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { ChangeEvent, ImagesFieldDefinition, LabeledField, register } from '@formsey/core';
import { css, html, LitElement, property, query, queryAll, TemplateResult } from 'lit-element';

export class ImageCheckbox extends LitElement {
  static get styles() {
    return css`
    :host {
      display: inline-block;
    }
    label {
      display: inline-block;
    }
    input[type="checkbox"] {
      opacity: 0;
      width: 0;
      height: 0;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      border-radius: var(--formsey-input-border-radius, var(--fs-border-radius, 3px));
      border: 1px solid transparent;
      opacity: .8;
      z-index: -1;
    }
    img:hover {
      opacity: .9;
    }
    :focus+label>img {
      border: 1px solid var(--formsey-border-color-focus, var(--fs-border-color-focus, orange));
    }
    :checked+label>img {
      opacity: 1;
    }
    label {
      display: block;
      position: relative;
      cursor: pointer;
      user-select: none;
    }
    label::before {
      content: '✓';
      color: var(--formsey-text-color, var(--fs-accent-color-text, #ffffff));
      border: 1px solid transparent;
      border-radius: 50%;
      position: absolute;
      right: .5em;
      top: .5em;
      width: 1em;
      height: 1em;
      display: none;
      text-align: center;
      line-height: 1;
    }

    :checked+label {
      border-color: #ddd;
    }
    :checked+label::before {
      display: block;
      border: 1px solid var(--formsey-text-color, var(--fs-accent-color-text, #ffffff));
      background-color: var(--formsey-primary-color, var(--fs-accent-color, inherit));
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

  @query("input[type='checkbox']")
  checkbox: HTMLInputElement

  render() {
    return html`<input id="${this.id}" type="checkbox" @keydown="${this.keyDown}" @click="${this.clicked}" ?checked="${this.checked}" ?disabled="${this.disabled}" ?required="${this.required}"><label for="${this.id}"><img src="${this.src}" alt="${this.alt}" /></label>`;
  }

  focus() {
    this.checkbox.focus()
  }

  clicked(e: Event) {
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

export class ImagesField extends LabeledField<ImagesFieldDefinition, string[]> {
  @property({ type: Array })
  value: string[];

  @queryAll("formsey-image-checkbox")
  checkboxes: ImageCheckbox[]

  static get styles() {
    return [...super.styles, css`
      formsey-image-checkbox {
        width: 5em;
        height: 5em;
      }
    `]
  }

  renderField() {
    if (!this.value) {
      this.value = []
    }
    let templates: TemplateResult[] = [];
    if (this.definition.images) {
      for (let i = 0; i < this.definition.images.length; i++) {
        let image = this.definition.images[i]
        let label = image.label ? image.label : image.value;
        let value = image.value ? image.value : image.label;
        let checked = this.value.includes(value);
        templates.push(html`<formsey-image-checkbox @keydown="${this.keyDown}" id="${value}" ?checked="${checked}" @change="${this.changed}" src="${image.src}" alt="${image.alt}" label="${image.label}"></formsey-image-checkbox>`);
      }
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<div class="images">${templates}</div>`;
  }

  focusField(path: string) {
    if (path == this.definition.name) {
    }
  }

  changed(e: Event) {
    this.value = []
    this.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        this.value.push(checkbox.id)
      }
    })
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
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
register("formsey-images", ImagesField)