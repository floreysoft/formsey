import { KEYCODE } from '@floreysoft/utils';
import { createField, LabeledField, ListFieldDefinition, StringFieldDefinition } from '@formsey/core';
import { BoxLayout } from '@formsey/core/Layouts';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { ComboboxField } from './ComboboxField';

@customElement("formsey-select")
export class SelectField extends ComboboxField {
  over = true

  renderField() {
    const selectedOption = this.definition.options?.filter(option => this.value && (option.value || option.label) == this.value)?.[0]
    const button = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "button", name: "value", align: "left", icon: selectedOption?.icon, text: selectedOption?.label } as StringFieldDefinition, parentPath: this.path(), errors: this.errors })
    const formatter = getFormatter("flex")
    const layout = { elevation: 1, border: "soft" } as BoxLayout
    const style = `${formatter.outerBoxStyle?.(layout)};${formatter.innerBoxStyle?.(layout)};visibility:${this.popupVisible ? "visible" : "hidden"};top:${this.top};width:${this.width}`
    const list = html`<div class="popup" style=${style}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "list", name: "options", options: this.definition.options, hideCheckmark: typeof this.value === "undefined", searchThreshold: this.definition.searchThreshold } as ListFieldDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.optionSelected(event) })}</div>`
    return html`<div class="trigger">${button}</div>${list}`
  }

  firstUpdated() {
    const trigger = this.trigger.firstElementChild
    trigger.addEventListener("click", (e: CustomEvent) => {
      e.stopPropagation()
      this.openPopup()
      this.updateComplete.then(() => {
        (<any>this.popup.firstElementChild).focusField()
      })
    })
  }
}

getLibrary("native").registerComponent("select", {
  importPath: "@formsey/fields-native/SelectField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-select id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${<string>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-select>`
  }
})