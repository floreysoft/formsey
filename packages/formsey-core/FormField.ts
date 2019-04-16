import { html, property, query } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { createField, FormDefinition, Field, ValueChangedEvent } from '@formsey/core';

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
  private section : HTMLElement

  private _value: Object = {}
  private _definition: FormDefinition

  private resizeHandler = ( (e : Event) => this.resize() )

  renderStyles() {
    return `
      .colspan-2 {
        grid-column-end: span 2;
      }
      .colspan-3 {
        grid-column-end: span 3;
      }
      .colspan-4 {
        grid-column-end: span 4;
      }
      .colspan-5 {
        grid-column-end: span 5;
      }
      .colspan-6 {
        grid-column-end: span 6;
      }
      .colspan-7 {
        grid-column-end: span 7;
      }
      .colspan-8 {
        grid-column-end: span 8;
      }
      .colspan-9 {
        grid-column-end: span 9;
      }
      .colspan-10 {
        grid-column-end: span 10;
      }
      .colspan-12 {
        grid-column-end: span 12;
      }

      .sd .colspan-1, .sd .colspan-2, .sd .colspan-3, .sd .colspan-4, .sd .colspan-5, .sd .colspan-6, .sd .colspan-7, .sd .colspan-8, .sd .colspan-9, .sd .colspan-10 {
        grid-column-end: span 6;
      }

      .sd .colspan-12 {
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
    window.addEventListener("resize",  this.resizeHandler)
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.resizeHandler)
    super.disconnectedCallback()
  }

  renderField() {
    return html`<section class="fs-form">
      ${repeat(this.definition.fields, field => html`
      <div class='fs-form-field ${field.colspan ? "colspan-" + field.colspan : "colspan-12"}'>
      ${createField(this.configuration, field, this.value && field.name ? this.value[field.name] : undefined, (event: ValueChangedEvent<any>) => this.valueChanged(event))}
      </div>`)}
      </section>`;
  }

  resize() {
    console.log("Resize triggered")
    if (this.section) {
      if (this.section.clientWidth < 720) {
        this.section.classList.add("sd");
      } else {
        this.section.classList.remove("sd");
      }
    }
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
}

customElements.define('formsey-form', FormField);