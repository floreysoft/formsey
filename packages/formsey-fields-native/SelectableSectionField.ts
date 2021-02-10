import { createField, DEFAULT_BREAKPOINTS, Field, LabeledField, ListFieldDefinition, SelectableSectionFieldDefinition, SUPPORTED_BREAKPOINTS } from '@formsey/core';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { Layout } from '@formsey/core/Layouts';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

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
    this.updateLayout()
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  @property()
  protected layout: Layout | undefined

  @query("section")
  private section: HTMLElement | undefined

  private resizeObserver: ResizeObserver
  private values: string[]
  private selectedValue: string
  private index: number
  private size: string | undefined
  protected _definition: SelectableSectionFieldDefinition | undefined

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.resize(entry.contentRect.width)
      }
    });
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
        this.selectedValue = selection.value ? selection.value : selection.label;
      }
      if (selection) {
        form = html`${selection?.fields ? html`<div class="form">${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "form", fields: selection.fields, layout: selection.layout } as FormDefinition, value: this.value?.value, parentPath: this.path() + ".value", errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>` : undefined}`;
      }
    }
    const staticFormatter = getFormatter(this.definition.layout?.static?.formatter)
    const responsiveFormatter = this.layout?.formatter ? getFormatter(this.layout?.formatter) : undefined
    const style = `${staticFormatter?.containerStyle(this.definition.layout?.static)};${responsiveFormatter?.containerStyle(this.layout, this.definition)}`
    return html`<section style=${style}>${super.render()}${form}<div class="fbg" style="${ifDefined(staticFormatter?.fieldStyle(this.definition.layout?.static))}"></div></section>`;
  }

  renderField() {
    let options = this.definition?.selections?.map(selection => { return { label: selection.label, value: selection.value } });
    return html`${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: this.definition.selection || "select", name: "selection", options } as ListFieldDefinition, value: this.selectedValue, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.selectionChanged(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}`
  }

  firstUpdated() {
    this.resizeObserver.observe(this.section)
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected resize(availableWidth: number) {
    // If available with larger than larges breakpoint, default to the largest
    let detectedSize = SUPPORTED_BREAKPOINTS[SUPPORTED_BREAKPOINTS.length - 1]
    for (let size of SUPPORTED_BREAKPOINTS) {
      let breakpoint = this.definition?.layout?.breakpoints?.[size]
      if (typeof breakpoint === "undefined") {
        breakpoint = DEFAULT_BREAKPOINTS[size]
      }
      if (breakpoint > availableWidth) {
        detectedSize = size
        break
      }
    }
    if (this.size != detectedSize) {
      // console.log("Grid size in form=" + this.definition.name + " changed from '" + this.gridSize + "' to '" + size + "'")
      this.size = detectedSize
      this.updateLayout()
    }
  }

  protected updateLayout() {
    this.layout = undefined
    let sizeFound = false
    for (let size of SUPPORTED_BREAKPOINTS) {
      sizeFound = (size == this.size || sizeFound)
      this.layout = this.definition?.layout?.responsive?.[size] || this.layout
      if (this.layout && sizeFound) {
        break
      }
    }
  }

  protected selectionChanged(e: ValueChangedEvent<string>) {
    let value = e.detail.value;
    let option = this.definition.selections.filter(selection => (selection.value ? selection.value === value : selection.label === value))[0].value;
    if (option) {
      this.value.selection = option;
      this.value.value = {}
      this.dispatchEvent(new ValueChangedEvent("inputChange", e.detail.name, this.value));
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
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SelectableSectionFieldDefinition, SelectableSectionValue>) => {
    return html`<formsey-selectable-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-selectable-section>`
  }
})