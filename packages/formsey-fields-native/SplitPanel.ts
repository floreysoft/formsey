import '@floreysoft/splitter';
import { createField, Field, InvalidEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { SplitPanelDefinition } from '@formsey/core/FieldDefinitions';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-split-panel")
export class SplitPanel extends Field<SplitPanelDefinition, any> {
  @property({ converter: Object })
  value: string;

  renderField() {
    return html`<fs-splitter direction=${this.definition.direction}>
    <div id="first">${createField({ components: this.components, settings: this.settings, definition: this.definition.first, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
    <div id="second">${createField({ components: this.components, settings: this.settings, definition: this.definition.second, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
    </fs-splitter>`
  }
}

getLibrary("native").registerComponent("splitPanel", {
  importPath: "@formsey/fields-native/SplitPanel",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SplitPanelDefinition, any>) => {
    return html`<formsey-split-panel id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-split-panel>`
  }
})