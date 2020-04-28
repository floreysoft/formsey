import { createField, Field, FieldDefinition, FormField, register, ValueChangedEvent } from '@formsey/core';
import { property, queryAll, css } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

export class Form extends Field<FieldDefinition, Object> {
  public static formAssociated = true;

  private resizeHandler = ((e: CustomEvent) => { this.resize() })

  value: Object = {}

  async fetchDefinition(url: string) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.definition = data.definition
      this.value = data.value
      this.theme = data.theme
      this.requestUpdate();
    } catch (reason) {
      console.error(reason.message)
    }
  }

  @property()
  set src(url: string) {
    this.fetchDefinition(url);
  }

  @queryAll("formsey-form-field")
  protected _forms: HTMLElement[]
  protected internals: any
  protected form : any

  static get styles() {
    return [...super.styles, css`
      :host {
        outline: none
      }`];
  }

  constructor() {
    super()
    // @ts-ignore
    this.internals = this.attachInternals();
  }

  protected formResetCallback() {
    this.value = {};
    this.internals.setFormValue('');
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("resize", this.resizeHandler)
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("resize", this.resizeHandler)
  }

  renderField() {
    let value = this.value
    if (this.definition.name && this.value && this.value[this.definition.name]) {
      value = this.value[this.definition.name]
    }
    return createField(this.components, this.definition, value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  updated() {
    this.updateComplete.then(() => {
      this.resize()
    })
  }

  public validate(report: boolean) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (report) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
  }

  protected valueChanged(e: ValueChangedEvent<any>) {
    this.value = e.value;
    if (e.name.startsWith('.')) {
      e.name = e.name.substring(1)
    }
    let value: any
    if (this.definition.name) {
      value = {}
      value[this.definition.name] = this.value
    } else {
      value = this.value
    }
    this.dispatchEvent(new ValueChangedEvent(e.name, value));
    this.dispatchEvent(new CustomEvent('change', { detail: { name, value } }))
    this.internals.setFormValue(this.value);
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.errors = e.errors
    this.dispatchEvent(new InvalidEvent(e.errors));
  }

  public resize() {
    // Resize nested forms
    if (this._forms) {
      for (let form of this._forms) {
        (<FormField>form).resize()
      }
    }
  }

  public focus() {
    // Focus the first field that wants to autofocus
    if (this._forms) {
      for (let form of this._forms) {
        (<FormField>form).focus()
      }
    }
  }
}
register('formsey-form', Form)