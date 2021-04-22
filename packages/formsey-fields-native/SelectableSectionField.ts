import { createField, FieldInputEvent, LabeledField, ListFieldDefinition, SelectableSectionFieldDefinition } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { FieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/Events';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { Layout } from '@formsey/core/Layouts';
import { Formatter, getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';


export class SelectableSectionValue {
  selection: string = ""
  value: { [key: string]: any } = {}
}

@customElement("formsey-selectable-section")
export class SelectableSectionField extends LabeledField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  // @ts-ignore()
  set definition(definition: SelectableSectionFieldDefinition) {
    this._definition = definition;
    this.requestUpdate();
  }

  get definition() {
    // @ts-ignore()
    return this._definition
  }

  @property()
  protected layout: Layout | undefined

  @query("section")
  private section: HTMLElement | undefined

  private values: string[] | undefined
  private selectedValue: string | undefined
  private index: number | undefined
  protected _definition: SelectableSectionFieldDefinition | undefined
  protected layoutController: LayoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  render() {
    let form = undefined
    if (!this.definition) return
    if (this.definition.selections) {
      this.values = this.definition.selections.map(selection => (selection.value ? selection.value : selection.label));
      this.index = 0
      if (this.value && this.value.selection) {
        this.index = this.values.indexOf(this.value.selection);
      } else {
        this.value = { selection: this.values[0], value: {} }
      }
      let selection = this.definition.selections[this.index];
      if (selection) {
        let previousValue = this.selectedValue
        this.selectedValue = selection.value ? selection.value : selection.label;
        if (this.selectedValue != previousValue && typeof this.value.value == "undefined") {
          this.value.value = selection.default
          this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
        }
      }
      if (selection) {
        form = html`${selection?.fields ? html`<div class="form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout } as FormDefinition, value: this.value?.value, parentPath: this.path() + ".value", errors: this.errors, clickHandler: this.clicked, changeHandler: this.changed, inputHandler: this.changed, invalidHandler: this.invalid })}</div>` : undefined}`;
      }
    }
    this.layoutController.updateLayout(this.definition.layout)
    const formatter: Formatter | undefined = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
    const style: string = formatter ? `${formatter?.innerBoxStyle?.(this.layoutController?.layout) || ""};${formatter?.outerBoxStyle?.(this.layoutController?.layout) || ""};${formatter?.containerStyle?.(this.layoutController.layout, this.definition) || ""};${formatter?.backgroundStyle?.(this.layoutController?.layout) || ""}` : ""
    return html`<section class="ffg" style=${style}>${super.render()}${form}<div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div></section>`;
  }

  renderField() {
    let options = this.definition?.selections?.map(selection => { return { label: selection.label, value: selection.value } });
    return html`${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: this.definition.control || "select", name: "selection", options } as ListFieldDefinition, value: this.selectedValue, parentPath: this.path(), errors: this.errors, changeHandler: this.selectionChanged, invalidHandler: this.invalid })}`
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild?.firstElementChild?.nextElementSibling
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected selectionChanged(e: FieldChangeEvent<string>) {
    let value = e.detail.value
    let selection = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label === value))[0];
    if (selection) {
      this.value = this.value || new SelectableSectionValue()
      this.value.selection = selection.value || selection.label
      this.value.value = selection.default && JSON.parse(JSON.stringify(selection.default))
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
      this.requestUpdate()
    }
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.value = this.value || new SelectableSectionValue()
    if (e.detail.name.startsWith(this.path() + ".value")) {
      let name = e.detail.name.substring((this.path() + ".value").length + 1).split('.')[0].split('[')[0]
      if (name) {
        if (typeof this.value.value != "object") {
          this.value.value = {}
        }
        this.value.value[name] = e.detail.value;
      } else {
        this.value.value = e.detail.value
      }
      this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, this.value) : new FieldChangeEvent(e.detail.name, this.value));
    }
  }
}

getLibrary("native").registerComponent("selectableSection", {
  importPath: "@formsey/fields-native/SelectableSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, clickHandler, invalidHandler, id }: Resources<SelectableSectionFieldDefinition, SelectableSectionValue>) => {
    return html`<formsey-selectable-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @click=${clickHandler} @change=${changeHandler} @input=${inputHandler}  @invalid=${invalidHandler}></formsey-selectable-section>`
  },
  nestedFields: (definition: SelectableSectionFieldDefinition, value: any) => {
    const fields: FieldDefinition[] = []
    definition.selections?.forEach(selection => {
      if (selection.name)
        fields.push({ ...selection, type: "form" })
    })
    return fields
  }
})