import { createField, Field } from '@formsey/core';
import { FormDefinition, PanelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-panel")
export class PanelField extends Field<PanelFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  render() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon as string) : this.definition.icon
    this.layoutController.updateLayout(this.definition.layout)
    const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
    const outerStyle = formatter ? `${formatter.outerBoxStyle(this.layoutController?.layout)};${formatter.backgroundStyle(this.layoutController?.layout)}` : ""
    const innerStyle = formatter?.innerBoxStyle(this.layoutController?.layout) || ""
    return html`<div style=${outerStyle}><header>${icon}${this.definition.label}</header>
    <div class="panel" style=${innerStyle}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", name: this.definition.name, fields: this.definition.fields, deferLayout: true, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div></div>`
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
  }
}

getLibrary("native").registerComponent("panel", {
  importPath: "@formsey/fields-native/PanelField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<PanelFieldDefinition, Object>) => {
    return html`<formsey-panel id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-panel>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})