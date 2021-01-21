import { Components, getFormatter, getIcon, getLibrary, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldClickEvent } from '@formsey/core/FieldClickEvent';
import { ButtonFieldDefinition, CheckboxFieldDefinition, Records, StringFieldDefinition, TableFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FormField } from '@formsey/core/FormField';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { TableLayout, ToolbarLayout } from '@formsey/core/ResponsiveLayout';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, TemplateResult } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-table")
export class TableField extends FormField<TableFieldDefinition, Records> {
  renderField() {
    let fixed: TemplateResult[] = [];
    let scrollable: TemplateResult[] = [];
    const searchFixed: TemplateResult[] = [];
    const searchScrollable: TemplateResult[] = [];
    const formatter = getFormatter(this.layout?.formatter)
    const fixedColumns = (<TableLayout>this.layout)?.fixedColumns || 0
    if (this.layout) {
      const hasSearchableColumns = (<TableLayout>this.layout).columns?.filter(column => column.searchable).length > 0
      if (this.definition.selectable) {
        const templates = fixedColumns > 0 ? fixed : scrollable
        templates.push(html`<div class="td">${createField(this.components, this.settings, { type: "checkbox", name: "selectAll", indeterminate: true } as CheckboxFieldDefinition, undefined, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`)
        if (hasSearchableColumns) {
          const search = fixedColumns > 0 ? searchFixed : searchScrollable
          search.push(html`<div class="td ts"></div>`)
        }
      }
      (<TableLayout>this.layout).columns?.forEach((column, index) => {
        if (column.visible) {
          const field = this.definition.fields.filter(field => field.name == column.field)[0]
          if (field) {
            const templates = index < fixedColumns ? fixed : scrollable
            if (column.sortable) {
              templates.push(html`<div class="td th" title=${field.helpText} @click="${e => this.sort(field.name)}">${field.label}${this.value.sortedBy === field.name ? this.value.sortDirection == "ascending" ? getIcon("Sort ascending") : getIcon("Sort descending") : undefined}</div>`)
            } else {
              templates.push(html`<div class="td th" title=${field.helpText}>${field.label}</div>`)
            }
            if (hasSearchableColumns) {
              const search = index < fixedColumns ? searchFixed : searchScrollable
              if (column.searchable) {
                search.push(html`<div class="td ts">${createField(this.components, this.settings, { type: "string", name: field.name } as StringFieldDefinition, undefined, this.path() + ".search", this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`)
              } else {
                search.push(html`<div class="td ts"></div>`)
              }
            }
          }
        }
      })
      fixed = [...fixed, ...searchFixed]
      scrollable = [...scrollable, ...searchScrollable]
      if (this.value?.data) {
        for (let i: number = 0; (i + (this.value.pageStart || 0)) < this.value.data.length && i < (this.definition.pageLength || this.value.data.length); i++) {
          const value = { ...this.value.data[i + (this.value.pageStart || 0)] }
          const key = this.definition.key ? value[this.definition.key] : i
          if (this.definition.selectable) {
            const templates = fixedColumns > 0 ? fixed : scrollable
            const classes = {
              td: true,
              cell: true,
              first: true,
              last: i == (this.definition.pageLength || this.value.data.length) - 1
            }
            templates.push(html`<div class=${classMap(classes)} style="${ifDefined(formatter?.fieldStyle(this.layout))}">${createField(this.components, this.settings, { type: "checkbox", name: "__s" }, this.definition.selectable && this.value.selections?.includes(key), this.path() + ".data[" + key + "]", this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`);
          }
          (<TableLayout>this.layout).columns.forEach((column, index) => {
            if (column.visible) {
              const templates = index < fixedColumns ? fixed : scrollable
              const field = this.definition.fields.filter(field => field.name == column.field)[0]
              if (field) {
                const classes = {
                  td: true,
                  cell: true,
                  first: !this.definition.selectable && index == 0,
                  last: i == (this.definition.pageLength || this.value.data.length) - 1
                }
                templates.push(html`<div class=${classMap(classes)} style="${ifDefined(formatter?.fieldStyle(this.layout, field))}">${createField(this.components, this.settings, { ...field, label: undefined, helpText: undefined }, value[field.name], this.path() + ".data[" + i + "]", this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`);
              }
            }
          })
        }
      }
    }
    let pager: TemplateResult
    if (this.definition.pageLength < this.value?.data.length || this.definition?.dataSource) {
      let pagerDefinition = {
        type: "form",
        fields: [
          {
            type: "button",
            name: "start",
            icon: "Start",
            buttonType: "button",
            disabled: !this.value.dataSource?.canFirst || false
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "prev",
            icon: "Previous",
            buttonType: "button",
            disabled: !this.value.dataSource?.canPrevious || this.value.pageStart == 0
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "next",
            icon: "Next",
            buttonType: "button",
            disabled: !this.value.dataSource?.canNext || this.value.pageStart + this.definition.pageLength > this.value.data.length
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "end",
            icon: "Start",
            buttonType: "button",
            disabled: !this.value.dataSource?.canLast
          } as ButtonFieldDefinition
        ],
        layout: {
          sizes: {
            xs: {
              formatter: "toolbar",
              horizontal: "right"
            } as ToolbarLayout
          }
        }
      }
      pager = html`<formsey-form .components=${this.components} .settings=${this.settings} .definition=${pagerDefinition} @click=${this.page}></formsey-form>`
    }
    return html`<section style="${ifDefined(this.definition?.layout?.style)}">
      <div class="ffg">
        <div class="tw" style="${ifDefined((<TableLayout>this.layout)?.fill == "grow" ? "flex-grow:1" : undefined)}">
          <div class="b">
            ${(<TableLayout>this.layout)?.fixedColumns ? html`<div class="fixed" style="${ifDefined(formatter?.containerStyle(this.layout, this.definition, true, this.definition.selectable))}" @gridSizeChanged="${this.gridSizeChanged}">${fixed}</div>` : undefined}
            <div class="scroll" style="${ifDefined(formatter?.containerStyle(this.layout, this.definition, false, !(<TableLayout>this.layout)?.fixedColumns && this.definition.selectable))}" @gridSizeChanged="${this.gridSizeChanged}">${scrollable}</div>
          </div>
          <div class="tnav">${pager}</div>
        </div>
      </div>
    </section>`
  }

  protected removeDeletedFields() {
  }

  protected page(e: CustomEvent) {
    e.stopPropagation()
    const action = e.detail.name
    if (this.definition.dataSource) {
      this.dispatchEvent(new FieldClickEvent(this.path() + "." + action));
    } else {
      if (action == "next") {
        this.value.pageStart = (this.value.pageStart || 0) + this.definition.pageLength
      } else if (action == "prev") {
        this.value.pageStart -= this.definition.pageLength
      } else if (action == "start") {
        this.value.pageStart = 0
      } else if (action == "end") {
        this.value.pageStart = this.value.data.length - (this.value.data.length % this.definition.pageLength)
        if (this.value.pageStart == this.value.data.length) {
          this.value.pageStart = this.value.data.length - this.definition.pageLength
        }
      }
      this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
      this.requestUpdate()
    }
  }

  protected sort(name: string) {
    if (this.value.sortedBy == name) {
      this.value.sortDirection = this.value.sortDirection == "ascending" ? "descending" : "ascending"
    } else {
      this.value.sortedBy = name
      this.value.sortDirection = "ascending"
    }
    if (this.definition.dataSource) {
      this.dispatchEvent(new FieldClickEvent(this.path() + ".sort", { sortedBy: name, sortDirection: this.value.sortDirection }))
    } else {
      this.value.pageStart = 0
      this.value.data.sort((a, b) => ((a[name] > b[name]) ? 1 : ((b[name] > a[name]) ? -1 : 0)) * (this.value.sortDirection == "descending" ? -1 : 1))
      this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
    }
    this.requestUpdate()
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (e.detail.name.startsWith(this.path() + ".data")) {
      let path = e.detail.name.substring(this.path().length + 6)
      let index = path.substring(0, path.indexOf("]"))
      let name = path.substring(path.indexOf("]") + 2).split('.')[0]
      if (name == "__s") {
        if (e.detail.value) {
          this.value.selections = this.value.selections ? [...this.value.selections, index] : [index]
        } else {
          let found = this.value.selections?.indexOf(index);
          if (typeof found !== "undefined" && found !== -1) {
            this.value.selections.splice(found, 1);
          }
        }
      } else {
        this.value.data[+index][name] = e.detail.value;
      }
    } else if (e.detail.name == this.path() + ".selectAll") {
      if (e.detail.value) {
        this.value.selections = this.value.data.map((entry, index) => this.definition.key ? entry[this.definition.key] : index)
      } else {
        // Only deleted items from current page
        this.value.data.forEach((entry, index) => {
          let del = this.value.selections.indexOf(this.definition.key ? entry[this.definition.key] : index);
          if (del !== -1) {
            this.value.selections.splice(del, 1);
          }
        })
      }
      this.requestUpdate()
    } else if (e.detail.name.startsWith(this.path() + ".search")) {
      const tokens = e.detail.name.split(".")
      const field = tokens[tokens.length - 1]
      this.value['search'] = { ...this.value['search'] }
      this.value['search'][field] = e.detail.value
    }
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
  }
}

getLibrary("native").registerComponent("table", {
  importPath: "@formsey/fields-native/TableField",
  factory: (components: Components, settings: Settings, definition: TableFieldDefinition, value: Records, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    // value = { ...value, "data": DUMMY_DATA }
    return html`<formsey-table id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-table>`
  }
})