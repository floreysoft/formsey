import { FieldChangeEvent, FieldClickEvent, FieldInputEvent } from '@formsey/core/Events';
import { createField } from '@formsey/core/Field';
import { ButtonFieldDefinition, CheckboxFieldDefinition, DialogSectionFieldDefinition, Records, StringFieldDefinition, TableFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FormField } from '@formsey/core/FormField';
import { FlexLayout, TableLayout } from '@formsey/core/Layouts';
import { getFormatter, getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-table")
export class TableField extends FormField<TableFieldDefinition, Records> {
  renderField() {
    if (this.definition && this.value ) {
      let fixed: TemplateResult[] = [];
      let scrollable: TemplateResult[] = [];
      const searchFixed: TemplateResult[] = [];
      const searchScrollable: TemplateResult[] = [];
      this.layoutController.updateLayout(this.definition.layout)
      const formatter = this.layoutController.layout?.formatter ? getFormatter(this.layoutController.layout?.formatter) : undefined
      const fixedColumns = (<TableLayout>this.layoutController.layout)?.fixedColumns || 0
      let hasSearchableColumns = false
      if (this.layoutController.layout) {
        hasSearchableColumns = (<TableLayout>this.layoutController.layout).columns?.filter(column => column.searchable).length > 0
        if (this.definition.selectable) {
          const templates = fixedColumns > 0 ? fixed : scrollable
          templates.push(html`<div class="td th">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "checkbox", name: "selectAll", indeterminate: true } as CheckboxFieldDefinition, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, invalidHandler: this.invalid })}</div>`)
          if (hasSearchableColumns) {
            const search = fixedColumns > 0 ? searchFixed : searchScrollable
            search.push(html`<div class="td ts"></div>`)
          }
        }
        (<TableLayout>this.layoutController.layout).columns?.forEach((column, index) => {
          if (column.visible) {
            const field = this.definition?.fields?.filter(field => field.name == column.field)[0]
            if (field) {
              const templates = index < fixedColumns ? fixed : scrollable
              const sort = this.value?.sortedBy === field.name
              const classes = {
                td: true,
                th: true,
                sort
              }
              if (column.sortable && field.name) {
                templates.push(html`<div class=${classMap(classes)} title=${ifDefined(field.helpText)} @click="${(e: Event) => this.sort(field.name!)}">${field.label}${this.value?.sortedBy === field.name ? this.value?.sortDirection == "ascending" ? getIcon("Sort ascending") : getIcon("Sort descending") : undefined}</div>`)
              } else {
                templates.push(html`<div class=${classMap(classes)} title=${ifDefined(field.helpText)}>${field.label}</div>`)
              }
              if (hasSearchableColumns) {
                const search = index < fixedColumns ? searchFixed : searchScrollable
                if (column.searchable) {
                  const value = this.value?.search?.[field!.name!] || "";
                  search.push(html`<div class="td ts">${createField({ library: this.library, context: this.context, settings: this.settings, value: value, definition: { type: "string", name: field.name } as StringFieldDefinition, parentPath: this.path() + ".search", errors: this.errors, inputHandler: this.changed, changeHandler: this.changed, invalidHandler: this.invalid })}</div>`)
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
          const lastRow = Math.min(this.definition.pageLength || 999, this.value.data.length) - 1
          for (let row: number = 0; (row + (this.value.pageStart || 0)) < this.value.data.length && row < (this.definition.pageLength || this.value.data.length); row++) {
            const value = { ...this.value.data[row + (this.value.pageStart || 0)] }
            const key = this.definition.key ? value[this.definition.key] : row
            const selected = !!(this.definition.selectable && this.value.selections?.includes(key))
            if (this.definition.selectable) {
              const templates = fixedColumns > 0 ? fixed : scrollable
              const classes = {
                td: true,
                cell: true,
                first: true,
                last: row == lastRow,
                selected
              }
              templates.push(html`<div class=${classMap(classes)} style="${ifDefined(formatter?.fieldStyle?.(this.layoutController.layout))}">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "checkbox", name: "__s" }, value: selected, parentPath: this.path() + ".data[" + key + "]", errors: this.errors, clickHandler: this.clicked, changeHandler: this.changed, inputHandler: this.changed, invalidHandler: this.invalid })}</div>`);
            }
            (<TableLayout>this.layoutController.layout).columns.forEach((column, index) => {
              if (column.visible) {
                const templates = index < fixedColumns ? fixed : scrollable
                const field = this.definition?.fields.filter(field => field.name == column.field)[0]
                if (field?.name) {
                  const classes = {
                    td: true,
                    cell: true,
                    first: !this.definition?.selectable && index == 0,
                    last: row == lastRow,
                    selected
                  }
                  templates.push(html`<div class=${classMap(classes)} style="${ifDefined(formatter?.fieldStyle?.(this.layoutController.layout, field))}">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { ...field, label: undefined, helpText: undefined }, value: value[field.name], parentPath: this.path() + ".data[" + row + "]", errors: this.errors, clickHandler: this.clicked, inputHandler: this.changed, changeHandler: this.changed, invalidHandler: this.invalid })}</div>`);
                }
              }
            })
          }
        }
      }
      let pager = undefined
      let fields: (ButtonFieldDefinition | DialogSectionFieldDefinition)[] = []
      this.definition?.actions?.forEach(action => {
        fields.push(action)
      })
      if ((this.definition?.pageLength || 0) < this.value?.data?.length || this.definition?.dataSource) {
        const disableFirst = this.value?.dataSource?.canFirst === false
        const disablePrevious = (this.value?.dataSource?.canPrevious === false) || (!this.value?.dataSource && (this.value?.pageStart || 0) == 0)
        const disasbleNext = (this.value?.dataSource?.canNext === false) || (!this.value?.dataSource && ((this.value?.pageStart || 0) + (this.definition?.pageLength || 0)) > this.value?.data.length)
        const disableLast = this.value?.dataSource?.canLast == false
        const disabled = (this.value?.selections?.length || 0) == 0
        this.definition?.selections?.forEach(action => {
          if (action.trigger) {
            action.trigger.disabled = disabled
            action.fields[0].default = `Do you really want to perform the selected action *${action.trigger.tooltip}* on *${this.value?.selections?.length || 0} records*?`
          }
          fields.push({ ...action })
        })
        if (!(disableFirst && disablePrevious && disasbleNext && disableLast)) {
          fields = [...fields,
          {
            type: "button",
            name: "start",
            icon: "Start",
            buttonType: "button",
            disabled: disableFirst
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "prev",
            icon: "Previous",
            buttonType: "button",
            disabled: disablePrevious
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "next",
            icon: "Next",
            buttonType: "button",
            disabled: disasbleNext
          } as ButtonFieldDefinition,
          {
            type: "button",
            name: "end",
            icon: "Start",
            buttonType: "button",
            disabled: disableLast
          } as ButtonFieldDefinition
          ]
        }
        if (fields.length > 0) {
          let pagerDefinition = {
            type: "form",
            fields,
            layout: {
              xs: {
                formatter: "flex",
                horizontal: "right"
              } as FlexLayout
            }
          }
          pager = html`<formsey-form-field .components=${this.library} .settings=${this.settings} .definition=${pagerDefinition as any} @click=${this.page}></formsey-form-field>`
        }
      }
      const style = formatter ? `${formatter.innerBoxStyle?.(this.layoutController?.layout)};${formatter.outerBoxStyle?.(this.layoutController?.layout)};${formatter.backgroundStyle?.(this.layoutController?.layout)}` : ""
      return html`<section>
      <div class="ffg"  style="${style}">
        <div class="tw">
           <div class="vscroll">
            <div class="tb" style="${ifDefined((<TableLayout>this.layoutController.layout)?.fill == "grow" ? "align-self:stretch" : undefined)}">
              ${(<TableLayout>this.layoutController.layout)?.fixedColumns ? html`<div class="fixed" style="${ifDefined(formatter?.containerStyle?.(this.layoutController.layout, this.definition, true, this.definition.selectable, hasSearchableColumns))}">${fixed}</div>` : undefined}
              <div class="scroll"><div style="${ifDefined(formatter?.containerStyle?.(this.layoutController.layout, this.definition, false, !(<TableLayout>this.layoutController.layout)?.fixedColumns && this.definition.selectable, hasSearchableColumns))}">${scrollable}</div></div>
            </div>
          </div>
          <div class="tnav">${pager}</div>
        </div>
      </div>
    </section>`
    }
  }

  protected removeDeletedFields() {
  }

  protected page(e: CustomEvent) {
    e.stopPropagation()
    if (this.definition?.pageLength) {
      const action = e.detail.name
      if (this.definition.dataSource) {
        this.dispatchEvent(new FieldClickEvent(this.path() + "." + action));
      } else {
        if (action == "next") {
          this.value.pageStart = (this.value.pageStart || 0) + this.definition.pageLength
        } else if (action == "prev") {
          this.value.pageStart = (this.value.pageStart || 0) - this.definition.pageLength
        } else if (action == "start") {
          this.value.pageStart = 0
        } else if (action == "end") {
          this.value.pageStart = this.value.data.length - (this.value.data.length % this.definition.pageLength)
          if (this.value.pageStart == this.value.data.length) {
            this.value.pageStart = this.value.data.length - this.definition.pageLength
          }
        }
        this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
        this.requestUpdate()
      }
    }
  }

  protected sort(name: string) {
    if (this.value.sortedBy == name) {
      this.value.sortDirection = this.value.sortDirection == "ascending" ? "descending" : "ascending"
    } else {
      this.value.sortedBy = name
      this.value.sortDirection = "ascending"
    }
    if (this.definition?.dataSource) {
      this.dispatchEvent(new FieldClickEvent(this.path() + ".sort", { sortedBy: name, sortDirection: this.value.sortDirection }))
    } else {
      this.value.pageStart = 0
      this.value.data.sort((a, b) => ((a[name] > b[name]) ? 1 : ((b[name] > a[name]) ? -1 : 0)) * (this.value.sortDirection == "descending" ? -1 : 1))
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    }
    this.requestUpdate()
  }

  protected changed(e: FieldChangeEvent<any>) {
    if (e.detail.name.startsWith(this.path() + ".data")) {
      let path = e.detail.name.substring(this.path().length + 6)
      let index = path.substring(0, path.indexOf("]"))
      let name = path.substring(path.indexOf("]") + 2).split('.')[0]
      if (name == "__s") {
        if (e.detail.value) {
          this.value.selections = this.value.selections ? this.value.selections.includes(index) ? this.value.selections : [...this.value.selections, index] : [index]
        } else {
          let found = this.value.selections?.indexOf(index);
          if (typeof found !== "undefined" && found !== -1) {
            this.value.selections?.splice(found, 1);
          }
        }
      } else {
        this.value.data[+index][name] = e.detail.value;
      }
    } else if (e.detail.name == this.path() + ".selectAll") {
      if (e.detail.value) {
        this.value.selections = this.value.data.map((entry, index) => this.definition?.key ? entry[this.definition.key] : index)
      } else {
        // Only deleted items from current page
        this.value.data.forEach((entry, index) => {
          let del = this.value.selections?.indexOf(this.definition?.key ? entry[this.definition.key] : index);
          if (typeof del !== "undefined" && del !== -1) {
            this.value.selections?.splice(del, 1);
          }
        })
      }
    } else if (e.detail.name.startsWith(this.path() + ".search")) {
      const tokens = e.detail.name.split(".")
      const field = tokens[tokens.length - 1]
      this.value['search'] = { ...this.value['search'] }
      this.value['search'][field] = e.detail.value
    }
    this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, this.value) : new FieldChangeEvent(e.detail.name, this.value));
    this.requestUpdate()
  }
}

getLibrary("native").registerComponent("table", {
  importPath: "@formsey/fields-native/TableField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, clickHandler, invalidHandler, id }: Resources<TableFieldDefinition, Records>) => {
    // value = { ...value, "data": DUMMY_DATA }
    return html`<formsey-table id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @click=${clickHandler} @change=${changeHandler} @input=${inputHandler}  @invalid=${invalidHandler}></formsey-table>`
  },
  nestedFields: (definition: TableFieldDefinition, value: any) => {
    return definition.fields
  }
})