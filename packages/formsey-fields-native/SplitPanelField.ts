import '@floreysoft/splitter';
import { createField, Field, InvalidEvent } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { SplitPanelDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';

@customElement("formsey-split-panel")
export class SplitPanelField extends Field<SplitPanelDefinition, any> {
  @property({ converter: Object })
  value: any | undefined

  render() {
    if ( !this.definition ) return
    return html`<fs-splitter direction=${this.definition.direction}>
    <div id="first">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { ...this.definition.first, type: this.definition.first.type || "form" }, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
    <div id="second">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { ...this.definition.second, type: this.definition.second.type || "form" }, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
    </fs-splitter>`
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldChangeEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
  }
}

getLibrary("native").registerComponent("horizontalSplitPanel", {
  importPath: "@formsey/fields-native/SplitPanel",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SplitPanelDefinition, any>) => {
    return html`<formsey-split-panel id="${ifDefined(id)}" .library=${library} .context=${context} .settings=${settings} .definition=${{ ...definition, direction: "horizontal" } as any} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-split-panel>`
  },
  nestedFields: (definition: SplitPanelDefinition, value: any) => {
    const fields = []
    fields.push({ ...definition.first, type: "form" })
    fields.push({ ...definition.second, type: "form" })
    return fields
  }
})

getLibrary("native").registerComponent("verticalSplitPanel", {
  importPath: "@formsey/fields-native/SplitPanel",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SplitPanelDefinition, any>) => {
    return html`<formsey-split-panel id="${ifDefined(id)}" .library=${library} .context=${context} .settings=${settings} .definition=${{ ...definition, direction: "vertical" } as any} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-split-panel>`
  },
  nestedFields: (definition: SplitPanelDefinition, value: any) => {
    const fields = []
    fields.push({ ...definition.first, type: "form" })
    fields.push({ ...definition.second, type: "form" })
    return fields
  }
})