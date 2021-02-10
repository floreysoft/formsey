import { createField, DEFAULT_BREAKPOINTS, Field, InvalidEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ResponsivePanelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-responsive-panel")
export class ResponsivePanelField extends Field<ResponsivePanelFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  @property()
  layout: "split" | "tabs"
  private resizeObserver: ResizeObserver

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.resize(entry.contentRect.width)
      }
    });
  }

  render() {
    let definition
    if (this.layout == "tabs") {
      definition = {
        type: "tabs",
        location: "bottom",
        expand: true,
        selections: this.definition.reverse ?
          [this.definition.second, this.definition.first] :
          [this.definition.first, this.definition.second]
      }
    } else {
      definition = {
        type: "verticalSplitPanel",
        first: {
          ...this.definition.first,
          type: "panel"
        },
        second: {
          ...this.definition.second,
          type: "panel"
        }
      }
    }
    return html`${createField({ components: this.components, context: this.context, settings: this.settings, definition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}`
  }

  firstUpdated() {
    this.resizeObserver.observe(this as Element)
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
  }

  private resize(width: number) {
    if (width < DEFAULT_BREAKPOINTS.s) {
      this.layout = "tabs"
    } else {
      this.layout = "split"
    }
  }
}

getLibrary("native").registerComponent("responsivePanel", {
  importPath: "@formsey/fields-native/ResponsivePanelField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ResponsivePanelFieldDefinition, Object>) => {
    return html`<formsey-responsive-panel id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-responsive-panel>`
  }
})