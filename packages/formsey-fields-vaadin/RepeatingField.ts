import '@vaadin/vaadin-icons/vaadin-icons.js';
import { TemplateResult, html, property } from 'lit-element';
import { createField, FormDefinition, ValueChangedEvent, RepeatingFieldDefinition, Field } from '@formsey/core';
import { InvalidEvent } from '@formsey/core/InvalidEvent';

export class RepeatingField extends Field<RepeatingFieldDefinition, Object[]> {
  @property({ converter: Object })
  value: Object[] = [];

  renderStyles() {
    return `
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
      padding: 2px;
      font-size: 14px;
      color: var(--lumo-primary-contrast-color);
      border-radius: var(--lumo-border-radius);
      background-color: var(--lumo-contrast-30pct);
      transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;
      line-height: 1.2;
    }

    .fs-nested-form:hover .fs-remove-wrapper {
      opacity: 1;
    }

    .fs-add:hover, .fs-remove:hover {
      background-color: var(--lumo-primary-color);
    }

    .fs-add {
      display: block;
      margin: 6px 0 0 3px;
    }`;
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
        const fieldDefinition: FormDefinition = {
          'type': "form",
          'name': "" + i,
          'fields': this.definition.form.fields
        }
        const template = html`<div class="fs-nested-form" draggable="true" @drop="${e => this.drop(e, i)}" @dragover="${e => this.allowDrop(e, i)}" @dragstart="${(e: DragEvent) => this.drag(e, i)}">${createField(this.configuration, fieldDefinition, value, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event))}
        ${this.value.length > this.definition.min ? html`<div class="fs-remove-wrapper"><iron-icon class="fs-remove" @click="${(e: Event) => this.removeForm(i)}" icon="vaadin:close-small"></iron-icon></div>` : html ``}</div>`;
        itemTemplates.push(template);
      }
    }
    return html`<div id='fs-repeat'>${itemTemplates}</div>${this.value.length < this.definition.max ? html`<iron-icon class="fs-add" @click="${(e: Event) => this.addForm()}" icon="vaadin:plus"></iron-icon>`: html``}`;
  }

  protected addForm() {
    this.value.push({});
    this.requestUpdate();
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  protected removeForm(index: number) {
    this.value.splice(index, 1);
    this.requestUpdate();
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
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
customElements.define('formsey-repeating-section', RepeatingField);