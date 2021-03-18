import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, FieldClickEvent } from '@formsey/core';
import { FieldDefinition, FormDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators";
import { classMap } from 'lit/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-tabs")
export class TabsField extends Field<TabsFieldDefinition, { [key: string]: any }> {
  @property({ converter: Object })
  value: { [key: string]: any } = {}

  @property({ type: Number })
  selectedIndex: number = 0

  @query(".selected")
  selecselectedTab: HTMLElement | undefined

  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  render() {
    if (this.definition) {
      const tabs: TemplateResult[] = []
      let content = undefined
      this.definition.selections?.forEach((selection, index) => {
        const icon = typeof selection.icon == "string" ? getIcon(selection.icon as string) : selection.icon as TemplateResult
        this.layoutController.updateLayout(selection.layout)
        const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
        const backgroundStyle = formatter?.backgroundStyle?.(this.layoutController?.layout) || ""
        const innerStyle = `${formatter?.innerBoxStyle?.(this.layoutController?.layout) || ""};${backgroundStyle}`
        tabs.push(html`<button tabIndex="0" type="button" style=${backgroundStyle} @keydown=${(e: KeyboardEvent) => this.keyDown(e, index)} @click=${(e: Event) => { this.select(index, selection.value || selection.name || selection.label) }} class="${classMap({ tab: true, selected: index == this.selectedIndex, expand: !!this.definition?.expand })}">${icon}${selection.label}</button>`)
        if (index == this.selectedIndex) {
          content = html`<div class="content" style=${innerStyle}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout, name: selection.name, deferLayout: true } as FormDefinition, value: selection.name ? this.value?.[selection.name] : this.value, parentPath: this.path(), errors: this.errors, clickHandler: (event: FieldChangeEvent<string>) => this.clicked(event), changeHandler: (event: FieldChangeEvent<string>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>`
        }
      })
      return html`<div class="container">${this.definition.location == "bottom" ? html`${content}<div class="tabs bottom">${tabs}</div>` : html`<div part="tabs" class="tabs top">${tabs}</div>${content}`}</div>`
    }
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldChangeEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
  }

  private select(index: number, value: string) {
    this.selectedIndex = index
    this.dispatchEvent(new FieldClickEvent(`${this.path()}.${value}`));
  }

  private keyDown(event: KeyboardEvent, index: number) {
    let newIndex = index
    switch (event.keyCode) {
      case KEYCODE.SPACE:
      case KEYCODE.RETURN:
        this.selectedIndex = index
        break;
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newIndex = Math.max(0, index - 1)
        break;
      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        newIndex = Math.min((this.definition?.selections?.length || 1) - 1, index + 1)
        break;
      default:
        return;
    }
    if (newIndex != index) {
      this.selectedIndex = newIndex
      this.updateComplete.then(() => {
        this.selecselectedTab?.focus()
      })
    }
  }
}

getLibrary("native").registerComponent("tabs", {
  importPath: "@formsey/fields-native/TabsField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<TabsFieldDefinition, Object>) => {
    return html`<formsey-tabs id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @click=${clickHandler} @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-tabs>`
  },
  nestedFields: (definition: TabsFieldDefinition, value: any) => {
    const fields: FieldDefinition[] = []
    definition.selections?.forEach(selection => {
      fields.push({ ...selection, type: "form" })
    })
    return fields
  }
})