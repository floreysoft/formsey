import { createField, FormDefinition, LabeledField, RepeatingFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { css, customElement, html, property, TemplateResult } from 'lit-element';

@customElement("formsey-repeating-section")
export class RepeatingField extends LabeledField<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  static get styles() {
    return [...super.styles, css`
    .fs-nested-form {
      position: relative;
      margin: 5px 0 0 11px;
      padding: 10px 0 5px 15px;
      border-left: 2px solid var(--lumo-contrast-10pct);
      transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), opacity 0.15s;
    }

    .fs-nested-form:hover {
      border-left: 2px solid var(--lumo-contrast-20pct);
    }

    .fs-remove-wrapper {
      position: absolute;
      line-height: 1em;
      top: calc(50% - 15px);
      left: -10px;
      background-color: var(--lumo-base-color);
      opacity: 0;
    }

    .fs-add, .fs-remove {
      width: 1em;
      height: 1em;
      padding: 0.3em;
      font-size: var(--formsey-repeating-section-icon-size, var(--lumo-font-size-s, 12px));
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
      display: block;
      margin: 6px 0 0 3px;
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
        const template = html`<div class="fs-nested-form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">${createField(this.configuration, fieldDefinition, value, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><svg class="fs-remove" @click="${(e: Event) => this.removeForm(i)}" viewBox="0 0 32 32"><title>Remove section</title><path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>
</svg></div>` : html ``}</div>`;
        itemTemplates.push(template);
      }
    }
    return html`<div id='fs-repeat'>${itemTemplates}</div>${this.value.length < this.definition.max ? html`<svg viewBox="0 0 32 32" class="fs-add" @click="${(e: Event) => this.addForm()}"><title>Add section</title><path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path></svg>`: html``}`;
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

  protected valueChanged(e: any) {
    const index: number = e.name;
    this.value[index] = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}