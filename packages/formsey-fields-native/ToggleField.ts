import '@floreysoft/toggle';
import { LabeledField } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Components';
import { ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
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
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ToggleFieldDefinition, string>) => {
    return html`<formsey-toggle id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-toggle>`
  }
})