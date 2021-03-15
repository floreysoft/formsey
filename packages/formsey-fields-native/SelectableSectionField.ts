import { createField, DEFAULT_BREAKPOINTS, Field, LabeledField, ListFieldDefinition, SelectableSectionFieldDefinition, SUPPORTED_BREAKPOINTS } from '@formsey/core';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { Layout } from '@formsey/core/Layouts';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


export class SelectableSectionValue {
  selection: string;
  value: Object = {}
}

@customElement("formsey-selectable-section")
export class SelectableSectionField extends LabeledField<SelectableSectionFieldDefinition, SelectableSectionValue> {
  @property({ converter: Object })
  value: SelectableSectionValue;


  @property({ converter: Object })
  // @ts-ignore()
  set definition(definition: SelectableSectionFieldDefinition) {
    this._definition = definition;
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  @property()
  protected layout: Layout | undefined

  @query("section")
  private section: HTMLElement | undefined

  private values: string[]
  private selectedValue: string
  private index: number
  protected _definition: SelectableSectionFieldDefinition | undefined
  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  render() {
    let form = undefined
    if (this.definition && this.definition.selections) {
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
          this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
        }
      }
      if (selection) {
        form = html`${selection?.fields ? html`<div class="form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout } as FormDefinition, value: this.value?.value, parentPath: this.path() + ".value", errors: this.errors, clickHandler: (event: ValueChangedEvent<string>) => this.clicked(event), changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>` : undefined}`;
      }
    }
    this.layoutController.updateLayout(this.definition.layout)
    const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
    const style = formatter ? `${formatter.innerBoxStyle(this.layoutController?.layout)};${formatter.outerBoxStyle(this.layoutController?.layout)};${formatter?.containerStyle(this.layoutController.layout, this.definition) || ""};${formatter.backgroundStyle(this.layoutController?.layout)}` : ""

    return html`<section class="ffg" style=${style}>${super.render()}${form}<div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div></section>`;
  }

  renderField() {
    let options = this.definition?.selections?.map(selection => { return { label: selection.label, value: selection.value } });
    return html`${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: this.definition.control || "select", name: "selection", options } as ListFieldDefinition, value: this.selectedValue, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.selectionChanged(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}`
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected selectionChanged(e: ValueChangedEvent<string>) {
    let value = e.detail.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label === value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = undefined
      this.requestUpdate()
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
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
      this.dispatchEvent(new ValueChangedEvent(e.type as "change" | "input" | "inputChange", e.detail.name, this.value));
    }
  }
}

getLibrary("native").registerComponent("selectableSection", {
  importPath: "@formsey/fields-native/SelectableSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<SelectableSectionFieldDefinition, SelectableSectionValue>) => {
    return html`<formsey-selectable-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @click=${clickHandler} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section>`
  },
  nestedFields: (definition: SelectableSectionFieldDefinition, value: any) => {
    const fields = []
    definition.selections?.forEach(selection => {
      if (selection.name)
        fields.push({ ...selection, type: "form" })
    })
    return fields
  }
})