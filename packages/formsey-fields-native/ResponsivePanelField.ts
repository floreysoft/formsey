import { createField, DEFAULT_BREAKPOINTS, Field, FieldInputEvent, InvalidEvent } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { ResponsivePanelFieldDefinition, SplitPanelDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-responsive-panel")
export class ResponsivePanelField extends Field<ResponsivePanelFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  @property()
  layout: "split" | "tabs" = "split"

  private resizeObserver: ResizeObserver

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries: any, observer: any) => {
      for (const entry of entries) {
        this.resize(entry.contentRect.width)
      }
    });
  }

  render() {
    if (this.definition) {
      let definition
      if (this.layout == "tabs") {
        definition = {
          type: "tabs",
          location: "bottom",
          expand: true,
          selections: this.definition.reverse ?
            [this.definition.second, this.definition.first] :
            [this.definition.first, this.definition.second]
        } as TabsFieldDefinition
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
        } as SplitPanelDefinition
      }
      return html`${createField({ library: this.library, context: this.context, settings: this.settings, definition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, inputHandler: this.inputted, clickHandler: this.clicked, invalidHandler: this.invalid })}`
    }
  }

  firstUpdated() {
    this.resizeObserver.observe(this as Element)
  }

  protected inputted(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldInputEvent(e.detail.name, e.detail.value));
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldChangeEvent(e.detail.name, e.detail.value));
  }

  private resize(width: number) {
    if (width < DEFAULT_BREAKPOINTS.s!) {
      this.layout = "tabs"
    } else {
      this.layout = "split"
    }
  }
}

getLibrary("native").registerComponent("responsivePanel", {
  importPath: "@formsey/fields-native/ResponsivePanelField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, clickHandler, invalidHandler, id }: Resources<ResponsivePanelFieldDefinition, Object>) => {
    return html`<formsey-responsive-panel id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @click="${clickHandler}" @invalid=${invalidHandler}></formsey-responsive-panel>`
  },
  nestedFields: (definition: ResponsivePanelFieldDefinition, value: any) => {
    const fields = []
    fields.push({ ...definition.first, type: "form" })
    fields.push({ ...definition.second, type: "form" })
    return fields
  }
})