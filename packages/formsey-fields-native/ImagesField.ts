import { KEYCODE, walkAndFocus } from "@floreysoft/utils";
import { ImagesFieldDefinition, LabeledField } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, LitElement, property, query, queryAll, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-image-checkbox")
export class ImageCheckbox extends LitElement {
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

  @property({ type: String })
  label: string

  @property({ type: String })
  path: string

  @property({ type: Number })
  tabIndex: number

  @query("input[type='checkbox']")
  checkbox: HTMLInputElement

  render() {
    return html`<input id="${this.path}.${this.id}.cb" tabindex="${this.tabIndex}" type="checkbox" @keydown="${this.keyDown}" @change="${this.changed}" @focus="${e => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('focus'))}}"  @blur="${e => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('blur'))}}" ?checked="${this.checked}" ?disabled="${this.disabled}" ?required="${this.required}"><label for="${this.path}.${this.id}.cb"><img src="${this.src}" alt="${this.alt}"/>${ifDefined(this.label)}</label>`;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  updated() {
    this.checkbox.checked = this.checked
  }

  focus() {
    this.checkbox.focus()
  }

  changed(e: Event) {
    e.stopPropagation()
    this.checked = (<HTMLInputElement>e.target).checked;
    this.dispatchEvent(new ValueChangedEvent(e.type as "change", this.id, this.checkbox.checked));
  }

  private keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.RETURN:
        this.checkbox.checked = !this.checkbox.checked
        this.changed(e)
        break
    }
  }
}
@customElement("formsey-images")
export class ImagesField extends LabeledField<ImagesFieldDefinition, string[] | string> {
  @property({ type: Object })
  // @ts-ignore
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

  @query(".ifi")
  images: HTMLElement

  columnWidth: number

  ro: ResizeObserver

  _definition: ImagesFieldDefinition

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
        templates.push(html`<formsey-image-checkbox @keydown="${this.keyDown}" path="${this.path()}" id="${value}" ?checked="${checked}" @focus="${this.focused}" @blur="${this.blurred}" @change="${this.changed}" src="${image.src}" alt="${image.alt}" label="${image.label}" .tabIndex="${i == 0 ? 0 : -1}"></formsey-image-checkbox>`);
      }
    }
    return html`<div class="ifi" style="columns:${this.columns} auto">${templates}</div>`;
  }

  firstUpdated() {
    this.ro.observe(this.images)
  }

  focusField() {
    if (this.checkboxes) {
      this.checkboxes[0].focus()
      return true
    }
    return false
  }

  changed(e: CustomEvent) {
    if (e.detail) {
      if (this.definition.multiple) {
        let value = []
        this.checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
            value.push(this.extractValue(checkbox.id))
          }
        })
        this.value = value
      } else {
        this.value = e.detail.value ? this.extractValue(e.detail.name) : undefined
      }
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    }
  }

  private extractValue(value : string) : string {
    let path = value.split('.')
    return path[path.length-1];
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

getLibrary("native").registerComponent("images", {
  importPath: "@formsey/fields-native/ImagesField",
  template: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<ImagesFieldDefinition, string[] | string> ) => {
    return html`<formsey-images id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-images>`
  }
})