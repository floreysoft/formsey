import '@floreysoft/splitter';
import { createField, Field, FieldInputEvent } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { SplitPanelDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-split-panel")
export class SplitPanelField extends Field<SplitPanelDefinition, any> {
  @property({ converter: Object })
  value: any | undefined

  render() {
    if (!this.definition) return
    return html`<fs-splitter direction=${this.definition.direction}>
    <div id="first">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { ...this.definition.first, type: this.definition.first.type || "form" }, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, inputHandler: this.inputted, clickHandler: this.clicked, invalidHandler: this.invalid })}</div>
    <div id="second">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { ...this.definition.second, type: this.definition.second.type || "form" }, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, inputHandler: this.inputted, clickHandler: this.clicked, invalidHandler: this.invalid })}</div>
    </fs-splitter>`
  }

  protected inputted(e: FieldInputEvent<any>) {
    this.dispatchEvent(new FieldInputEvent(e.detail.name, e.detail.value));
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldChangeEvent(e.detail.name, e.detail.value));
  }
}

getLibrary("native").registerComponent("horizontalSplitPanel", {
  importPath: "@formsey/fields-native/SplitPanel",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler,  clickHandler, invalidHandler, id }: Resources<SplitPanelDefinition, any>) => {
    return html`<formsey-split-panel id="${ifDefined(id)}" .library=${library} .context=${context} .settings=${settings} .definition=${{ ...definition, direction: "horizontal" } as any} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @click=${clickHandler} @invalid=${invalidHandler}></formsey-split-panel>`
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
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, clickHandler, invalidHandler, id }: Resources<SplitPanelDefinition, any>) => {
    return html`<formsey-split-panel id="${ifDefined(id)}" .library=${library} .context=${context} .settings=${settings} .definition=${{ ...definition, direction: "vertical" } as any} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}" @click=${clickHandler} @invalid=${invalidHandler}></formsey-split-panel>`
  },
  nestedFields: (definition: SplitPanelDefinition, value: any) => {
    const fields = []
    fields.push({ ...definition.first, type: "form" })
    fields.push({ ...definition.second, type: "form" })
    return fields
  }
})