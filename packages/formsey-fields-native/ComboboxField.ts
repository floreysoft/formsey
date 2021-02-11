import { createField, LabeledField } from '@formsey/core';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { ListFieldDefinition, StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { BoxLayout } from '@formsey/core/Layouts';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-combobox")
export class ComboboxField extends LabeledField<ListFieldDefinition, string> {
  @query(".popup")
  popup: HTMLElement

  @query(".string")
  string: HTMLElement

  renderField() {
    const string = createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "string", name: "value" } as StringFieldDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.search(event) })
    const options = this.definition.options.filter(option => this.value && option.label.toLowerCase().startsWith(this.value.toLowerCase()))
    let list = undefined
    if (options.length > 0 && (options.length > 1 || (options[0].value || options[0].label) != this.value)) {
      const box = getFormatter("box")
      const layout = { elevation: 1 } as BoxLayout
      list = html`<div class="popup" style=${box.containerStyle(layout)}>${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "list", name: "options", options, hideCheckmark: true, query: this.value } as ListFieldDefinition, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.optionSelected(event) })}<div class="fbg" style="${box.fieldStyle(layout)}"></div></div>`
    }
    return html`<div class="string">${string}</div>${list}`
  }

  updated() {
    this.updateComplete.then(() => {
      if (this.popup) {
        const rect = this.string.firstElementChild.getBoundingClientRect()
        const height = this.popup.getBoundingClientRect().height
        this.popup.style.visibility = "visible"
        this.popup.style.top = `${rect.top + rect.height}px`
        this.popup.style.width = `${rect.width}px`
      }
    })
  }

  private search(e: CustomEvent) {
    this.value = e.detail.value
  }

  private optionSelected(e: CustomEvent) {
    this.value = e.detail.value
  }
}

getLibrary("native").registerComponent("combobox", {
  importPath: "@formsey/fields-native/ComboboxField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-combobox id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-combobox>`
  }
})