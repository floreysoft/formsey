import { createField, Field, LabeledField, RepeatingFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, queryAll, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export const ICON_MINUS = html`<svg viewBox="0 0 24 24"><title>Remove section</title><path d="M5 13h14c0.552 0 1-0.448 1-1s-0.448-1-1-1h-14c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg>`
export const ICON_PLUS = html`<svg viewBox="0 0 24 24"><title>Add section</title><path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg>`

@customElement("formsey-repeating-section")
export class RepeatingSectionField extends LabeledField<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  @queryAll(".form")
  protected _fields: HTMLElement[]

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
        let fieldErrors = new InvalidErrors()
        if (this.errors) {
          for (let error in this.errors) {
            let path = this.definition.name + "[" + i + "]."
            if (this.definition.name && (error.startsWith(path))) {
              fieldErrors[error.substring(path.length)] = this.errors[error]
            }
          }
        }
        const template = html`<div class="form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><button class="fs-remove"  tabindex="0" @click="${(e: Event) => this.removeForm(e, i)}">${ICON_MINUS}</button></div>` : undefined}
        ${createField(this.components,this.settings,  { ...this.definition.form }, value, this.path() + "[" + i + "]", fieldErrors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`;
        itemTemplates.push(template);
      }
    }
    const addButton = this.value.length < this.definition.max ? html`<button @click="${this.addForm}" class="fs-add" tabindex="0">${ICON_PLUS}</button>` : undefined
    return html`<div id='fs-repeat'>${itemTemplates}</div>${addButton}`;
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
      let name = path.substring(path.indexOf("]") + 2).split('.')[0]
      if (!this.value[+index]) {
        this.value[+index] = {}
      }
      this.value[+index][name] = e.detail.value;
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    for (let error in e.errors) {
      let index = error.indexOf('.')
      this.errors[this.definition.name + "[" + error.substring(0, index) + "]." + error.substring(index + 1)] = e.errors[error]
    }
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("native").registerComponent("repeatingSection", {
  importPath: "@formsey/fields-native/RepeatingSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object[], parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-repeating-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-repeating-section>`
  }
})