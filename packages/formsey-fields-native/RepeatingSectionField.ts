import { createField, Field, FormDefinition, LabeledField, register, RepeatingFieldDefinition, ChangeEvent, ClickEvent } from '@formsey/core';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { css, html, property, queryAll, TemplateResult } from 'lit-element';
import { NESTED_FORM_STYLE } from './styles';

export const ICON_MINUS = html`<svg viewBox="0 0 24 24"><title>Remove section</title><path d="M5 13h14c0.552 0 1-0.448 1-1s-0.448-1-1-1h-14c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg>`
export const ICON_PLUS = html`<svg viewBox="0 0 24 24"><title>Add section</title><path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg>`

export class RepeatingSectionField extends LabeledField<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  @queryAll(".form")
  protected _fields: HTMLElement[]

  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE, css`
    .form {
      position: relative;
      margin: 0.5em 0 0 0.8em;
      padding: 0 0 5px 15px;
      border-left: 2px solid var(--fs-widget-background-color);
      font-size: var(--formsey-repeating-section-icon-size, inherit);
      transition: all 0.12s ease-out;
    }

    .form:hover {
      border-left: 2px solid var(--fs-widget-background-color-hover);
    }

    .fs-remove-wrapper {
      position: absolute;
      line-height: 0;
      padding: 0.4em 0;
      top: calc(50% - 1em);
      left: -0.8em;
    }
    button svg {
      width: 1em;
      height: auto;
      stroke-width: 0;
      fill: var(--formsey-repeating-section-icon-fill-color, var(--fs-text-color, currentColor));
    }
    button {
      display: flex;
      width: 1.4em;
      height: 1.4em;
      font-size: var(--formsey-repeating-section-icon-size, inherit);
      border-radius: 50%;
      background-color: var(--formsey-repeating-section-icon-background-color, var(--fs-widget-background-color, inherit));
      transition: background-color 0.12s ease-out;
      border: var(--formsey-input-border, 1px solid transparent);
      padding: 0.2em;
    }
    button:focus {
      outline: none;
      border: 1px solid var(--formsey-border-color-focus, var(--fs-border-color-focus, #020b2f));
    }
    .form:hover .fs-remove-wrapper {
      opacity: 1;
    }
    .form:hover .fs-remove {
      background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--fs-widget-background-color-hover, inherit));
    }
    .fs-add:hover {
      background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--fs-widget-background-color-hover, inherit));
    }
    .fs-add {
      margin: 0.2em 0.1em 0.1em;
    }`]
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
        const fieldDefinition: FormDefinition = { ...this.definition.form, name: "" + i }
        let fieldErrors = {}
        if (this.errors) {
          for (let error in this.errors) {
            let path = this.definition.name + "[" + i + "]."
            if (this.definition.name && (error.startsWith(path))) {
              fieldErrors[error.substring(path.length)] = this.errors[error]
            }
          }
        }
        const template = html`<div class="form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><button class="fs-remove"  tabindex="0" @click="${(e: Event) => this.removeForm(i)}">${ICON_MINUS}</button></div>` : undefined}
        ${createField(this.components, fieldDefinition, value, fieldErrors, (event: ChangeEvent<any>) => this.changed(event), (event: ClickEvent<any>) => this.clicked(event), (event: InvalidEvent) => this.invalid(event))}</div>`;
        itemTemplates.push(template);
      }
    }
    return html`<div id='fs-repeat'>${itemTemplates}</div>${this.value.length < this.definition.max ? html`<button  tabindex="0" @click="${(e: Event) => this.addForm()}" class="fs-add">${ICON_PLUS}</button>` : undefined}`;
  }

  public focusField(path: string) {
    let index
    if (path.startsWith(this.definition.name + "[")) {
      index = path.substring(this.definition.name.length + 1, path.indexOf(']'))
      path = path.substring(path.indexOf(']')+1)
    }
    let i = 0
    for (let field of this._fields) {
      if (index == i) {
        let child = field.firstElementChild as Field<any, any>
        if (child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
          (<any>child).focusField(path)
        }
      }
      i++
    }
  }

  public validate(report: boolean) {
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if (report) {
        child.reportValidity();
      } else {
        child.checkValidity();
      }
    }
    return true;
  }

  protected addForm() {
    this.value.push({});
    this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    this.requestUpdate();
    this.updateComplete.then(() => { this.resize() })
  }

  protected removeForm(index: number) {
    this.value.splice(index, 1);
    this.requestUpdate();
    this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
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
        this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
      }
      this.requestUpdate();
    }
    */
  }

  protected changed(e: ChangeEvent<any>) {
    let path = e.detail.name.split('.')
    let index = path.shift()
    this.value[index] = e.detail.value;
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name+"["+index+"]."+path.shift(), this.value));
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
register("formsey-repeating-section", RepeatingSectionField)