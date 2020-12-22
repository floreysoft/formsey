import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { CheckboxFieldDefinition, FieldDefinition, Records, TableFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { LabeledField } from '@formsey/core/LabeledField';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';


@customElement("formsey-table")
export class TableField extends LabeledField<TableFieldDefinition, Records> {

  renderField() {
    const headerTemplates: TemplateResult[] = [];
    let rowDefinition = { type: "form", fields: [] }
    let columns = ""
    if (this.definition.selectable) {
      headerTemplates.push(html`<div class="th">${createField(this.components, this.settings, { type: "checkbox", name: "selectAll", indeterminate: typeof this.value.selectAll == "undefined" } as CheckboxFieldDefinition , this.value.selectAll, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`)
      rowDefinition.fields.push({ type: "checkbox", name: "__s" })
      columns += "1.5em"
    }
    for (const field of this.definition.form.fields) {
      headerTemplates.push(html`<div class="th" title=${field.helpText}>${field.label}</div>`)
      rowDefinition.fields.push({ ...field, label: undefined, helpText: undefined })
      columns += columns ? " " : ""
      columns += "30%"
    }
    const layout = `grid-template-columns: ${columns};gap: 5px;align-items: center;`
    rowDefinition['layout'] = { grids: { xs: layout } }
    const rowsTemplates: TemplateResult[] = [];
    if (this.value?.data) {
      for (let i: number = 0; i < this.value.data.length; i++) {
        const value = { ...this.value.data[i] }
        if (this.definition.selectable && (this.value.selectAll || this.value.selections?.includes(i + (this.value.pageStart || 0)))) {
          value['__s'] = true
        } else {
          value['__s'] = false
        }
        rowsTemplates.push(createField(this.components, this.settings, rowDefinition, value, this.path() + ".data[" + i + "]", this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event)));
      }
    }
    return html`<div class="tblh" style="${layout}">${headerTemplates}</div><div class='tblr'>${rowsTemplates}</div>`;
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (e.detail.name.startsWith(this.path() + ".data")) {
      let path = e.detail.name.substring(this.path().length + 6)
      let index = +path.substring(0, path.indexOf("]"))
      let name = path.substring(path.indexOf("]") + 2).split('.')[0]
      if (name == "__s") {
        if (e.detail.value) {
          this.value.selections = this.value.selections ? [...this.value.selections, index] : [index]
          this.value.selections.sort((a, b) => a - b)
        } else {
          let found = this.value.selections?.indexOf(index);
          if (typeof found !== "undefined" && found !== -1) {
            this.value.selections.splice(found, 1);
          }
        }
        this.value.selectAll = undefined
      } else {
        this.value.data[+index][name] = e.detail.value;
      }
    } else if (e.detail.name == this.path() + ".selectAll") {
      this.value.selections = undefined
      this.value.selectAll = e.detail.value
      this.requestUpdate()
    }
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
  }
}

getLibrary("native").registerComponent("table", {
  importPath: "@formsey/fields-native/TableField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object[], parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-table id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-table>`
  }
})