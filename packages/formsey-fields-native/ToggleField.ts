import '@floreysoft/toggle';
import { createField, LabeledField } from '@formsey/core';
import { Components, getIcon, getLibrary, Settings } from '@formsey/core/Components';
import { ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-toggle")
export class ToggleField extends LabeledField<ToggleFieldDefinition, string> {
  @property({ converter: Object })
  value: string;

  renderField() {
    const buttons = []
    for (let i = 0; i < this.definition.buttons?.length; i++) {
      const icon = typeof this.definition.buttons[i].icon == "string" ? getIcon(this.definition.buttons[i].icon as string) : this.definition.buttons[i].icon
      buttons.push(html`<fs-toggle id=${this.definition.buttons[i].name} ?selected=${this.definition.buttons[i].name == this.value}>${icon}</fs-toggle>`)
    }
    return html`<fs-toggles @select=${this.select}>${buttons}</fs-toggles>`
  }

  private select(e: CustomEvent) {
    this.value = e.detail
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }
}

getLibrary("native").registerComponent("toggle", {
  importPath: "@formsey/fields-native/ToggleField",
  factory: (components: Components, settings: Settings, definition: ToggleFieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-toggle id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-toggle>`
  }
})