import { createField, Field, LabeledField, RepeatingFieldDefinition } from '@formsey/core';
import { getFormatter, getIcon, getLibrary, Resources } from '@formsey/core/Components';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, queryAll, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-repeating-section")
export class RepeatingSectionField extends LabeledField<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  @queryAll(".form")
  protected _fields: HTMLElement[]

  protected render(): void | TemplateResult {
    const staticFormatter = getFormatter(this.definition.layout?.static?.formatter)
    return html`<section style=${ifDefined(staticFormatter?.containerStyle(this.definition.layout?.static))}>${super.render()}<div class="fbg" style="${ifDefined(staticFormatter?.fieldStyle(this.definition.layout?.static))}"></div></section>`;
  }

  renderField() {
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
        const template = html`<div class="form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><button class="fs-remove" tabindex="0" @click="${(e: Event) => this.removeForm(e, i)}">${getIcon('Minus')}</button></div>` : undefined}
        ${createField({ components: this.components, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: { ...this.definition.layout, static: undefined } } as FormDefinition, value: value, parentPath: this.path() + "[" + i + "]", errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>`;
        itemTemplates.push(template);
      }
    }
    const addButton = this.value.length < this.definition.max ? html`<button @click="${this.addForm}" class="fs-add" tabindex="0">${getIcon('Plus')}</button>` : undefined
    return html`<div>${itemTemplates}</div>${addButton}`;
  }

  public focusField(path: string) {
    for (let i = 0; i < this._fields.length; i++) {
      let child = this._fields[i].lastElementChild as Field<any, any>
      if (child && typeof child['focusField'] == "function" && path.startsWith(child.path())) {
        return (<any>child).focusField(path)
      }
    }
    return false
  }

  public validate(report: boolean) {
    for (let field of this._fields) {
      let child = field.lastElementChild as Field<any, any>
      if (report) {
        child.reportValidity();
      } else {
        child.checkValidity();
      }
    }
    return true;
  }

  protected addForm(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.value.push({});
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    this.requestUpdate();
  }

  protected removeForm(e: Event, index: number) {
    e.preventDefault()
    e.stopPropagation()
    this.value.splice(index, 1);
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    this.requestUpdate();
  }

  protected drag(e, from: number) {
    // e.dataTransfer.setData("text", "move="+from);
  }

  protected allowDrop(e: any, index: number) {
    // e.preventDefault();
  }

  protected drop(e: any, to: number) {
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

  protected changed(e: ValueChangedEvent<any>) {
    if (e.detail.name.startsWith(this.path())) {
      let path = e.detail.name.substring(this.path().length + 1)
      let index = path.substring(0, path.indexOf("]"))
      const tokens = path.split(".")
      let name = tokens[1]
      if (!this.value[+index]) {
        this.value[+index] = {}
      }
      this.value[+index][name] = e.detail.value;
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
    }
  }
}

getLibrary("native").registerComponent("repeatingSection", {
  importPath: "@formsey/fields-native/RepeatingSectionField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<RepeatingFieldDefinition, Object[]>) => {
    return html`<formsey-repeating-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-repeating-section>`
  }
})