import { createField, LabeledField } from '@formsey/core';
import { ListFieldDefinition, StringFieldDefinition, Option } from '@formsey/core/FieldDefinitions';
import { BoxLayout } from '@formsey/core/Layouts';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, query, state } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { FieldInputEvent } from '@formsey/core/FieldInputEvent';


@customElement("formsey-combobox")
export class ComboboxField extends LabeledField<ListFieldDefinition, string> {
  @query(".popup")
  protected popup: HTMLElement | undefined

  @query(".trigger")
  protected trigger: HTMLElement | undefined

  @state()
  protected popupVisible: boolean = false
  @state()
  protected width: string | undefined
  protected top: string | undefined

  protected over = false

  private query: string = ""
  private firstMatch: Option | undefined

  private closeHandler = (e: Event) => this.hidePopup()

  renderField() {
    if (this.definition) {
      const trigger = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "string", name: "value" } as StringFieldDefinition, value: this.query, parentPath: this.path(), errors: this.errors, inputHandler: this.search })
      let list = undefined
      this.firstMatch = undefined
      const options = this.definition.options?.filter(option => this.value && option.label.toLowerCase().startsWith(this.query.toLowerCase()))
      if (this.popupVisible && options && options.length > 0 && (options.length > 1 || (options[0].label != this.query))) {
        this.firstMatch = options[0]
        const formatter = getFormatter("flex")
        const layout = { elevation: 1, border: "soft" } as BoxLayout
        const style = `${formatter?.outerBoxStyle?.(layout)};${formatter?.innerBoxStyle?.(layout)};;top:${this.top};width:${this.width}`
        list = html`<div class="popup" style=${style}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "list", name: "options", options, hideCheckmark: true, query: this.value } as ListFieldDefinition, parentPath: this.path(), errors: this.errors, changeHandler: this.optionSelected })}</div>`
      }
      return html`<div class="trigger">${trigger}</div>${list}`
    }
  }

  firstUpdated() {
    this.trigger?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.popup && this.popupVisible) {
        switch (event.key) {
          case "Tab":
          case "Enter":
            event.preventDefault()
            this.value = this.firstMatch?.value || this.firstMatch?.label
            this.query = this.firstMatch?.label || this.firstMatch?.value || ""
            this.optionSelected()
            break;
          case "Escape":
            this.popupVisible = false
            break;
        }
        document.addEventListener('click', this.closeHandler)
      }
    })
  }

  protected openPopup() {
    const rect = this.trigger?.firstElementChild?.getBoundingClientRect()
    if (rect) {
      this.top = `${rect.top + (this.over ? 0 : rect.height)}px`
      this.width = `${rect.width}px`
      this.popupVisible = true
      document.addEventListener('click', this.closeHandler)
    }
  }

  protected hidePopup() {
    this.popupVisible = false;
    (<any>this.trigger?.firstElementChild).focusField()
    document.removeEventListener('click', this.closeHandler)
  }

  protected optionSelected(e?: CustomEvent) {
    this.hidePopup()
    this.value = e ? e.detail.value : this.value
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  private search(e: CustomEvent) {
    this.openPopup()
    const options = this.definition?.options?.filter(option => option.label == e.detail.value)
    if (options && options.length == 1) {
      this.query = options[0].label
      this.value = options[0].value || this.query
    } else {
      this.value = e.detail.value
      this.query = this.value || ""
    }
    this.dispatchEvent(new FieldInputEvent(this.path(), this.value));
  }
}

getLibrary("native").registerComponent("combobox", {
  importPath: "@formsey/fields-native/ComboboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-combobox id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}" @invalid=${invalidHandler}></formsey-combobox>`
  }
})