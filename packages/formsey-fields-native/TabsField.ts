import { KEYCODE } from '@floreysoft/utils';
import { createField, Field } from '@formsey/core';
import { FormDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators";
import { classMap } from 'lit/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-tabs")
export class TabsField extends Field<TabsFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object = {}

  @property({ type: Number })
  selectedIndexIndex: number = 0

  @query(".selected")
  selecselectedTab: HTMLElement

  render() {
    const tabs = []
    let content: TemplateResult = undefined
    this.definition.selections?.forEach((selection, index) => {
      const icon: TemplateResult = typeof selection.icon == "string" ? getIcon(selection.icon as string) : selection.icon as TemplateResult
      tabs.push(html`<div tabIndex="0" @keydown=${(e: KeyboardEvent) => this.keyDown(e, index)} @click=${(e: Event) => { this.select(index) }} class="${classMap({ tab: true, selected: index == this.selectedIndexIndex, expand: this.definition.expand })}">${icon}${selection.label}</div>`)
      if (index == this.selectedIndexIndex) {
        content = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout, name: selection.name } as FormDefinition, value: selection.name ? this.value?.[selection.name] : this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })
      }
    })
    return html`<div class="container">${this.definition.location == "bottom" ? html`<div class="content">${content}</div><div part="tabs" class="tabs bottom">${tabs}</div>` : html`<div part="tabs" class="tabs top">${tabs}</div><div class="content">${content}</div>`}</div>`
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
  }

  private select(index: number) {
    this.selectedIndexIndex = index
  }

  private keyDown(event: KeyboardEvent, index: number) {
    let newIndex = index
    switch (event.keyCode) {
      case KEYCODE.SPACE:
      case KEYCODE.RETURN:
        this.selectedIndexIndex = index
        break;
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newIndex = Math.max(0, index - 1)
        break;
      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        newIndex = Math.min(this.definition.selections?.length - 1 || 0, index + 1)
        break;
      default:
        return;
    }
    if (newIndex != index) {
      this.selectedIndexIndex = newIndex
      this.updateComplete.then(() => {
        this.selecselectedTab.focus()
      })
    }
  }
}

getLibrary("native").registerComponent("tabs", {
  importPath: "@formsey/fields-native/TabsField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<TabsFieldDefinition, Object>) => {
    return html`<formsey-tabs id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-tabs>`
  },
  nestedFields: (definition: TabsFieldDefinition, value: any) => {
    const fields = []
    definition.selections?.forEach(selection => {
      fields.push({ ...selection, type: "form" })
    })
    return fields
  }
})