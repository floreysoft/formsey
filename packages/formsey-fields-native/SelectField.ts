import { KEYCODE } from '@floreysoft/utils';
import { createField, LabeledField, ListFieldDefinition, StringFieldDefinition } from '@formsey/core';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { BoxLayout } from '@formsey/core/Layouts';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-select")
export class SelectField extends LabeledField<ListFieldDefinition, string> {
  @query(".popup")
  popup: HTMLElement

  @query(".button")
  button: HTMLElement

  @property({ type: Boolean })
  private popupVisible = false

  @property({ type: String })
  private top: string

  @property({ type: String })
  private width: string

  private closeHandler = (e: Event) => this.hidePopup()

  renderField() {
    const selectedOption = this.definition.options.filter(option => this.value && (option.value || option.label) == this.value)?.[0]
    const button = createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "button", name: "value", icon: selectedOption?.icon, text: selectedOption?.label } as StringFieldDefinition, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.search(event) })
    const box = getFormatter("box")
    const layout = { elevation: 1 } as BoxLayout
    const style = `${box.containerStyle(layout)};visibility:${this.popupVisible ? "visible" : "hidden"};top:${this.top};width:${this.width}`
    const backgroundStyle = `${box.fieldStyle(layout)};visibility:${this.popupVisible ? "visible" : "hidden"}`
    const list = html`<div class="popup" @keydown=${this.keyDown} style=${style}>${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "list", name: "options", options: this.definition.options, hideCheckmark: typeof this.value === "undefined", searchThreshold: this.definition.searchThreshold } as ListFieldDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.optionSelected(event) })}</div><div class="fbg" style="${backgroundStyle}"></div>`
    return html`<div class="button">${button}</div>${list}`
  }

  firstUpdated() {
    const trigger = this.button.firstElementChild
    trigger.addEventListener("click", (e: CustomEvent) => {
      const rect = this.button.firstElementChild.getBoundingClientRect()
      this.popupVisible = true
      this.top = `${rect.top}px`
      this.width = `${rect.width}px`
      this.updateComplete.then(() => {
        (<any>this.popup.firstElementChild).focusField()
      })
      document.addEventListener('click', this.closeHandler)
    })
  }

  private search(e: CustomEvent) {
    this.value = e.detail.value
  }

  private optionSelected(e: CustomEvent) {
    e.stopPropagation()
    this.hidePopup()
    this.value = e.detail.value
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }

  private keyDown(event: KeyboardEvent) {
    if (event.keyCode == KEYCODE.ESCAPE) {
      event.preventDefault();
      event.stopPropagation()
      this.hidePopup()
    } else if (event.keyCode == KEYCODE.RETURN) {
      event.stopPropagation()
      event.preventDefault();
      this.hidePopup()
    }
  }

  private hidePopup() {
    this.popupVisible = false;
    (<any>this.button.firstElementChild).focusField()
    document.removeEventListener('click', this.closeHandler)
  }
}

getLibrary("native").registerComponent("select", {
  importPath: "@formsey/fields-native/SelectField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-select id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${<string>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-select>`
  }
})