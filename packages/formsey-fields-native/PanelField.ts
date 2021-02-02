import { createField, Field } from '@formsey/core';
import { getIcon, getLibrary, Resources } from '@formsey/core/Components';
import { FormDefinition, PanelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-panel")
export class PanelField extends Field<PanelFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  render() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon as string) : this.definition.icon
    return html`<header>${icon}${this.definition.label}</header>
    <div class="panel">${createField({ components: this.components, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>`
  }

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    if (e.detail?.name) {
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
    }
  }
}

getLibrary("native").registerComponent("panel", {
  importPath: "@formsey/fields-native/PanelField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<PanelFieldDefinition, Object>) => {
    return html`<formsey-panel id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-panel>`
  }
})