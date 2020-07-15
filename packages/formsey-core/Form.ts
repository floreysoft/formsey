import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { register } from './Components';
import { createField, Field } from './Field';
import { FieldDefinition } from './FieldDefinitions';
import { FormField } from './FormField';
import { InvalidError, InvalidErrors, InvalidEvent } from './InvalidEvent';
import { NATIVE_STYLES } from './styles';
import { ValueChangedEvent } from './ValueChangedEvent';

export function get(data: Object, path: string): any {
  if (!data || !path) {
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
  if (!data || !path) {
    return
  }
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

export class Form extends Field<FieldDefinition, any> {
  value: any

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

  @property()
  target: string

  @property()
  action: string

  @property()
  method: "GET" | "POST" | "dialog"

  @query('#form')
  form: FormField

  private _loaded: boolean = false

  static get styles() {
    return [...super.styles, NATIVE_STYLES]
  }

  protected shouldUpdate(): boolean {
    let update = super.shouldUpdate()
    if (!update) {
      update = (typeof this.definition === "undefined")
    }
    return update;
  }

  render() {
    let field = undefined
    if (this.definition) {
      field = createField(this.components, this.definition, this.value, this.definition?.name, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event), 'form');
    }
    return html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.action)}" method="${ifDefined(this.method)}" target="${ifDefined(this.target)}" >${field}<slot></slot></form>`
  }

  updated() {
    if (!this._loaded && this.definition) {
      this._loaded = true;
      this.dispatchEvent(new CustomEvent('load', { detail: { definition: this.definition, value: this.value, theme: this.theme } }))
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.clicked)
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this.attachShadow({ mode: 'open' });
  }

  renderHeader() {
    return
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

  public focusField(path: string) {
    if (this.form && typeof this.form['focusField'] === "function") {
      this.form.focusField(path)
    }
  }

  public setValidityMessage(path: string, validityMessage: string) {
    set(this.errors, path, validityMessage)
  }

  public clearCustomValidity() {
    super.clearCustomValidity()
    this.form.clearCustomValidity()
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    this.form.setCustomValidity(customErrors)
  }

  public validate(report: boolean, path?: string) {
    if (report) {
      return this.form.reportValidity(path);
    } else {
      return this.form.checkValidity(path);
    }
  }

  protected submit(e: Event) {
    if (!this.reportValidity()) {
      e.preventDefault()
    }
  }

  protected clicked(e) {
    if (!e.details) {
      e.stopPropagation()
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (this.definition.type == "form") {
      let name = e.detail.name.split('.')[0].split('[')[0]
      this.value[name] = e.detail.value
    } else {
      this.value = e.detail.value
    }
    const key = e.detail.name ? e.detail.name : this.definition.name
    if (e.type == "inputChange" || e.type == "input") {
      this.dispatchEvent(new ValueChangedEvent("input", key, this.value));
    }
    if (e.type == "inputChange" || e.type == "change") {
      this.dispatchEvent(new ValueChangedEvent("change", key, this.value));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.errors = e.errors
    console.log(JSON.stringify([...e.errors], null, 2))
    this.dispatchEvent(new InvalidEvent(e.errors));
  }

  protected focusError(path: string, error: InvalidError) {
    console.log(JSON.stringify(error))
  }

}

register("formsey-form", Form)
