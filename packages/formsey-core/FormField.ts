import { html, property, query, customElement, TemplateResult } from 'lit-element';
import { createField, FormDefinition, Field, ValueChangedEvent } from '@formsey/core';

class Layout {
  ld: number
  sd?: number
}

@customElement("formsey-form")
export class FormField extends Field<FormDefinition, Object> {
  @property({ converter: Object })
  set value(value: Object) {
    this._value = value;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  @property({ converter: Object })
  set definition(definition: FormDefinition) {
    this._definition = definition;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get definition() {
    return this._definition;
  }

  async fetchDefinition(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.definition = data
      this.requestUpdate();
    } catch (reason) {
      console.error(reason.message)
    }
  }

  @property()
  set src(url: string) {
    this.fetchDefinition(url);
  }

  @query("section")
  private section: HTMLElement

  private _value: Object = {}
  private _definition: FormDefinition

  private resizeHandler = ((e: Event) => this.resize())

  renderStyles() {
    return `
      .ld-2 {
        grid-column-end: span 2;
      }
      .ld-3 {
        grid-column-end: span 3;
      }
      .ld-4 {
        grid-column-end: span 4;
      }
      .ld-5 {
        grid-column-end: span 5;
      }
      .ld-6 {
        grid-column-end: span 6;
      }
      .ld-7 {
        grid-column-end: span 7;
      }
      .ld-8 {
        grid-column-end: span 8;
      }
      .ld-9 {
        grid-column-end: span 9;
      }
      .ld-10 {
        grid-column-end: span 10;
      }
      .ld-12 {
        grid-column-end: span 12;
      }

      .md .md-2 {
        grid-column-end: span 2;
      }
      .md .md-3 {
        grid-column-end: span 3;
      }
      .md .md-4 {
        grid-column-end: span 4;
      }
      .md .md-5 {
        grid-column-end: span 5;
      }
      .md .md-6 {
        grid-column-end: span 6;
      }
      .md .md-7 {
        grid-column-end: span 7;
      }
      .md .md-8 {
        grid-column-end: span 8;
      }
      .md .md-9 {
        grid-column-end: span 9;
      }
      .md .md-10 {
        grid-column-end: span 10;
      }
      .md .md-12 {
        grid-column-end: span 12;
      }

      .sd .sd-12 {
        grid-column-end: span 12;
      }

      .fs-form {
        display: inline-grid;
        width: 100%;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-auto-flow: dense;
        grid-gap: 0px 5px;
      }

      .fs-form-field {
        display: flex;
        flex-direction: column;
      }`;
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("resizeForm", this.resizeHandler)
    this.resize()
  }

  disconnectedCallback() {
    window.removeEventListener("resizeForm", this.resizeHandler)
    super.disconnectedCallback()
  }

  renderField() {
    // Create different layouts for various sizes
    let cols = 0
    let row: Layout[] = []
    let layout: Layout[] = []
    for (let field of this.definition.fields) {
      let colspan = field.colspan ? field.colspan : 12;
      row.push({ 'ld': colspan })
      cols += colspan
      if (cols == 12) {
        cols = 0
        let hasSmallColumns = false
        for (let i = 0; i < row.length; i++) {
          if (row[i]['ld'] < 4) {
            hasSmallColumns = true
            break
          }
        }
        if (hasSmallColumns) {
          // Try to double sizes and split across two rows
          let mdCols = 0
          for (let i = 0; i < row.length; i++) {
            let mdColspan = row[i]['ld'] * 2
            mdCols += mdColspan
            row[i]['md'] = mdColspan
            if (mdCols == 12) {
              mdCols = 0
            } else if (mdCols > 12) {
              // Unable to evenly split into two rows
              if (row.length == 2) {
                this.adjustTwoCells(row);
              } else if (row.length == 3) {
                this.adjustThreeCells(row)
              } else if (row.length == 4) {
                this.adjustTwoCells([row[0], row[1]])
                this.adjustTwoCells([row[2], row[3]])
              } else if (row.length == 5) {
                if (mdCols > 14) {
                  this.adjustTwoCells([row[0], row[1]])
                  this.adjustThreeCells([row[2], row[3], row[4]])
                } else {
                  this.adjustThreeCells([row[0], row[1], row[2]])
                  this.adjustTwoCells([row[3], row[4]])
                }
              }
              break
            }
          }
        }
        layout.push(...row)
        row = []
      }
    }
    layout.push(...row)
    const itemTemplates: TemplateResult[] = [];
    for (let i = 0; i < this.definition.fields.length; i++) {
      const field = this.definition.fields[i]
      let layoutClasses = "sd-12"
      if (layout[i]['md']) {
        layoutClasses += " md-" + layout[i]['md']
      }
      if (layout[i]['ld']) {
        layoutClasses += " ld-" + layout[i]['ld']
      }
      itemTemplates.push(html`<div class='fs-form-field ${layoutClasses}'>
  ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event:
  ValueChangedEvent<any>) => this.valueChanged(event))}
</div>`);
    }
    return html`<section class="fs-form">${itemTemplates}</section>`;
  }

  protected valueChanged(e: any) {
    if (e.name) {
      this.value[e.name] = e.value;
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
  }

  protected applyHiddenFields() {
    if (this._definition && this._value) {
      for (let field of this._definition.fields) {
        if (field.type == "hidden") {
          if (field.name && field.default) {
            this._value[field.name] = field.default;
          }
        }
      }
    }
  }

  private adjustThreeCells(row: Layout[]) {
    row[0]['md'] = 4
    row[1]['md'] = 4
    row[2]['md'] = 4
  }

  private adjustTwoCells(row: Layout[]) {
    if (row[0]['ld'] < 4 && row[1]['ld'] > 4) {
      row[0]['md'] = 4
      row[1]['md'] = 8
    } else if (row[0]['ld'] > 4 && row[1]['ld'] < 4) {
      row[0]['md'] = 8
      row[1]['md'] = 4
    } else {
      row[0]['md'] = 6
      row[1]['md'] = 6
    }
  }

  private resize() {
    if (this.section) {
      this.section.classList.remove("sd");
      this.section.classList.remove("md");
      if (this.section.clientWidth < 576) {
        this.section.classList.add("sd");
      } else if (this.section.clientWidth < 768) {
        this.section.classList.add("md");
      }
    }
  }
}