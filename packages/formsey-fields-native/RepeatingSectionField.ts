import { createField, FormDefinition, LabeledField, RepeatingFieldDefinition, ValueChangedEvent, Field } from '@formsey/core';
import { css, customElement, html, property, TemplateResult, queryAll } from 'lit-element';
import { InvalidEvent } from '@formsey/core/InvalidEvent';

@customElement("formsey-repeating-section")
export class RepeatingSectionField extends LabeledField<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  @queryAll(".fs-nested-form")
  protected _fields: HTMLElement[]

  static get styles() {
    return [...super.styles, css`
    .fs-nested-form {
      position: relative;
      margin: 0.5em 0 0 0.8em;
      padding: 10px 0 5px 15px;
      border-left: 2px solid var(--lumo-contrast-10pct);
      transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), opacity 0.15s;
      font-size: var(--formsey-repeating-section-icon-size, var(--lumo-font-size-s, 12px));
    }

    .fs-nested-form:hover {
      border-left: 2px solid var(--lumo-contrast-20pct);
    }

    .fs-remove-wrapper {
      position: absolute;
      line-height: 0;
      padding: 0.4em 0;
      top: calc(50% - 1em);
      left: -0.8em;
      background-color: var(--lumo-base-color);
    }

    .fs-add, .fs-remove {
      font-size: var(--formsey-repeating-section-icon-size, var(--lumo-font-size-s, 12px));
      width: 1em;
      height: 1em;
      padding: 0.2em;
      stroke-width: 0;
      fill: var(--formsey-repeating-section-icon-fill-color, var(--lumo-primary-contrast-color));
      border-radius: var(--lumo-border-radius);
      background-color: var(--formsey-repeating-section-icon-background-color, var(--lumo-contrast-30pct));
      transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;
    }

    .fs-nested-form:hover .fs-remove-wrapper {
      opacity: 1;
    }

    .fs-add:hover, .fs-remove:hover {
      background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--lumo-primary-color));
    }

    .fs-add {
      margin: 0.3em 0.2em 0;
    }`]
  }

  renderField() {
    if (!this.value) {
      this.value = [];
      if ( this.definition.min ) {
        for ( let i = 0; i < this.definition.min; i++ ) {
          this.value.push({});
        }
      }
    }
    const itemTemplates: TemplateResult[] = [];
    if (this.value) {
      for (let i: number = 0; i < this.value.length; i++) {
        const value = this.value[i];
        const fieldDefinition: FormDefinition = { ...this.definition.form, name: ""+i }
        let fieldErrors = {}
        if (this.errors) {
          for (let error in this.errors) {
            let path = this.definition.name + "[" + i + "]."
            if (this.definition.name && (error.startsWith(path))) {
                fieldErrors[error.substring(path.length)] = this.errors[error]
            }
          }
        }
        const template = html`<div class="fs-nested-form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">${createField(this.configuration, fieldDefinition, value, fieldErrors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><svg class="fs-remove" @click="${(e: Event) => this.removeForm(i)}" viewBox="0 0 32 32"><title>Remove section</title><path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>
</svg></div>` : html ``}</div>`;
        itemTemplates.push(template);
      }
    }
    return html`<div id='fs-repeat'>${itemTemplates}</div>${this.value.length < this.definition.max ? html`<svg viewBox="0 0 32 32" class="fs-add" @click="${(e: Event) => this.addForm()}"><title>Add section</title><path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path></svg>`: html``}`;
  }

  public validate(report : boolean) {
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if ( report ) {
        child.reportValidity();
      } else {
        child.checkValidity();
      }
    }
    return true;
  }

  protected addForm() {
    this.value.push({});
    this.requestUpdate();
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected removeForm(index: number) {
    this.value.splice(index, 1);
    this.requestUpdate();
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
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

  protected valueChanged(e: ValueChangedEvent<any>) {
    let index = this.firstPathElement(e.name);
    this.value[index] = e.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    for (let error in e.errors) {
      let index = error.indexOf('.')
      this.errors[this.definition.name + "[" + error.substring(0, index) +"]."+error.substring(index+1)] = e.errors[error]
    }
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}