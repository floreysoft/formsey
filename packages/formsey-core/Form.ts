import { createField, Field, FieldDefinition, FormDefinition, FormField, register, ChangeEvent } from '@formsey/core';
import { property, queryAll, css } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

export function get(data: Object, path: string): any {
  if (!data) {
    return undefined
  }
  let tokens = path.split('.')
  let token = tokens.shift()
  path = tokens.join('.')
  let found: any
  if (token.endsWith(']')) {
    let index = token.substring(token.indexOf('[') + 1, token.indexOf(']'));
    token = token.substring(0, token.indexOf('['))
    found = data[token][index]
  } else {
    found = data[token]
  }
  if (found && path) {
    return get(found, path)
  } else {
    return found
  }
}

export function set(data: Object, path: string, value: any): any {
  let tokens = path.split('.')
  let token = tokens.shift()
  path = tokens.join('.')
  if (token.endsWith(']')) {
    let index = token.substring(token.indexOf('[') + 1, token.indexOf(']'));
    token = token.substring(0, token.indexOf('['))
    if (path) {
      set(data[token][index], path, value)
    } else {
      data[token][index] = value
      return
    }
  } else {
    if (path) {
      set(data[token], path, value)
    } else {
      data[token] = value
      return
    }
  }
}

interface Logic {
  onValueChanged(key : string, form: Form) : void

  onDefinitionChanged(key: string, form: Form) : FormDefinition
}

export class Form extends Field<FieldDefinition, Object> {
  value: Object = {}

  logic: Logic

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

  protected form: any

  static get styles() {
    return [...super.styles, css`
      :host {
        outline: none;
      }`];
  }

  render() {
    let value = this.value
    if (this.definition.name && this.value && this.value[this.definition.name]) {
      value = this.value[this.definition.name]
    }
    return createField(this.components, this.definition, value, this.errors, (event: ChangeEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event));
  }

  renderHeader() {
    return
  }

  public validate(report: boolean) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (report) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
  }

  protected changed(e: ChangeEvent<any>) {
    this.value = e.detail.value;
    if (e.detail.name.startsWith('.')) {
      e.detail.name = e.detail.name.substring(1)
    }
    let value: any
    if (this.definition.name) {
      value = {}
      value[this.definition.name] = this.value
    } else {
      value = this.value
    }
    const key = e.detail.name ? e.detail.name : name
    if ( this.logic ) {
      this.logic.onValueChanged(key, this)
    }
    this.dispatchEvent(new ChangeEvent(key, value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.errors = e.errors
    this.dispatchEvent(new InvalidEvent(e.errors));
  }

  public focusField(path: string) {
    let child = this.shadowRoot?.firstElementChild as FormField
    if (child && typeof child['focusField'] === "function") {
      child.focusField(path)
    }
  }

  public getValue(path: string): any {
    return get(this.value, path);
  }

  public setValue(path: string, value: any): any {
    set(this.value, path, value);
    this.requestUpdate()
  }

  public getField(path: string): any {
    return get(this.definition, path);
  }

  public setField(path: string, value: any): any {
    set(this.definition, path, value);
    this.requestUpdate()
  }
}
register('formsey-form', Form)