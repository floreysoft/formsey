import { createField, Field, LabeledField, RepeatingFieldDefinition } from '@formsey/core';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html, TemplateResult } from "lit";
import { customElement, property, queryAll } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-repeating-section")
export class RepeatingSectionField extends LabeledField<RepeatingFieldDefinition, { [key: string]: any }[]> {
  @queryAll(".form")
  protected _fields: HTMLElement[] | undefined
  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  protected render(): void | TemplateResult {
    if (this.definition) {
      this.layoutController.updateLayout(this.definition.layout)
      const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
      const style = formatter ? `${formatter.innerBoxStyle?.(this.layoutController?.layout) || ""};${formatter.outerBoxStyle?.(this.layoutController?.layout) || ""};${formatter.backgroundStyle?.(this.layoutController?.layout) || ""}` : ""
      return html`<section style="${style}">${super.render()}<div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div></section>`;
    }
  }

  renderField() {
    if (this.definition) {
      if (!this.value) {
        this.value = [];
        if (this.definition.min) {
          for (let i = 0; i < this.definition.min; i++) {
            this.value.push({});
          }
        }
      }
      const itemTemplates: TemplateResult[] = [];
      if (this.value) {
        for (let i: number = 0; i < this.value.length; i++) {
          const value = this.value[i];
          const template = html`<div class="form" draggable="true" @drop="${(e: DragEvent) => this.drop(e, i)}" @dragover="${(e: DragEvent) => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><button class="fs-remove" tabindex="0" @click="${(e: Event) => this.removeForm(e, i)}">${getIcon('Minus')}</button></div>` : undefined}
        ${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout, deferLayout: true } as FormDefinition, value: value, parentPath: this.path() + "[" + i + "]", errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>`;
          itemTemplates.push(template);
        }
      }
      const addButton = this.value.length < this.definition.max ? html`<button @click="${this.addForm}" class="fs-add" tabindex="0">${getIcon('Plus')}</button>` : undefined
      return html`<div>${itemTemplates}</div>${addButton}`;
    }
  }

  public focusField(path: string) {
    if (this._fields) {
      for (let i = 0; i < this._fields.length; i++) {
        let child = this._fields[i].lastElementChild as Field<any, any>
        if (child && typeof (<any>child)['focusField'] == "function" && path.startsWith(child.path())) {
          return (<any>child).focusField(path)
        }
      }
    }
    return false
  }

  public validate(report: boolean) {
    if (this._fields) {
      for (let field of this._fields) {
        let child = field.lastElementChild as Field<any, any>
        if (report) {
          child.reportValidity();
        } else {
          child.checkValidity();
        }
      }
    }
    return true;
  }

  protected addForm(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.value ? this.value.push({}) : this.value = []
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    this.requestUpdate();
  }

  protected removeForm(e: Event, index: number) {
    e.preventDefault()
    e.stopPropagation()
    this.value ? this.value.splice(index, 1) : this.value = []
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    this.requestUpdate();
  }

  protected drag(e: DragEvent, from: number) {
    // e.dataTransfer.setData("text", "move="+from);
  }

  protected allowDrop(e: DragEvent, index: number) {
    // e.preventDefault();
  }

  protected drop(e: DragEvent, to: number) {
    /*
    let from = e.dataTransfer.getData("text");
    if (from.indexOf('move=')==0 && from.substring(5) != to) {
      let tmp = this.value[from];
      this.value[from] = this.value[to];
      this.value[to] = tmp;
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
      this.requestUpdate();
    }
    */
  }

  protected changed(e: FieldChangeEvent<any>) {
    if (e.detail.name.startsWith(this.path())) {
      let path = e.detail.name.substring(this.path().length + 1)
      let index = path.substring(0, path.indexOf("]"))
      const tokens = path.split(".")
      let name = tokens[1]
      this.value = this.value || []
      if (!this.value[+index]) {
        this.value[+index] = {}
      }
      this.value[+index][name] = e.detail.value;
      this.dispatchEvent(new FieldChangeEvent(e.detail.name, this.value));
    }
  }
}

getLibrary("native").registerComponent("repeatingSection", {
  importPath: "@formsey/fields-native/RepeatingSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<RepeatingFieldDefinition, Object[]>) => {
    return html`<formsey-repeating-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-repeating-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})