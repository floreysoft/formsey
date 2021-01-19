import { customElement, property, query } from "lit-element";
import { Field } from './Field';
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { FormField } from './FormField';
import { InvalidError, InvalidErrors, InvalidEvent } from './InvalidEvent';
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

@customElement("formsey-form")
export class Form extends Field<FieldDefinition, any> {
  value: any

  async fetchDefinition(url: string) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.definition = this.definition || data.definition
      this.value = this.value || data.value
      this.library = this.library || data.library
      this.settings = this.settings || data.settings
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
  target: "_blank" | "_parent" | "_self" | "_top"

  @property()
  action: string

  @property()
  method: "GET" | "POST"

  @property({ type: Boolean })
  anonymous: boolean

  @query(':first-child')
  form: FormField<FormDefinition, Object>

  @query('form')
  nativeForm: HTMLFormElement

  private _loaded: boolean = false

  // Batch invalid events
  private _invalidTimer = null

  protected shouldUpdate(): boolean {
    let update = super.shouldUpdate()
    if (!update) {
      update = (typeof this.definition === "undefined")
    }
    return update;
  }

  render() {
    if (this.definition) {
      this.definition['action'] = this.action
      this.definition['method'] = this.method
      this.definition['target'] = this.target
    }
    if (!this.errors) {
      this.errors = new InvalidErrors()
    }
    return this.components?.["styledForm"]?.factory(this.components, this.settings, this.definition, this.value, this.parentPath, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))
  }

  updated() {
    if (!this._loaded && this.definition) {
      this._loaded = true;
      this.dispatchEvent(new CustomEvent('load', { detail: { definition: this.definition, value: this.value, theme: this.library } }))
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.clicked)
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

  public focusField(path: string): boolean {
    if (this.form && typeof this.form['focusField'] === "function") {
      return this.form.focusField(path)
    }
    return false
  }

  public clearCustomValidity() {
    super.clearCustomValidity()
    this.form.clearCustomValidity()
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    this.form.setCustomValidity(customErrors)
  }

  public validate(report: boolean, path?: string) {
    this.errors.clear()
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
    if (!e.detail?.name) {
      e.stopPropagation()
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (!this.anonymous && e.detail.name) {
      const name = e.detail.name.split(".")[0].split("[")[0]
      this.value[name] = e.detail.value;
    } else {
      this.value = e.detail.value
    }
    if (e.type == "inputChange" || e.type == "input") {
      this.dispatchEvent(new ValueChangedEvent("input", e.detail.name, this.value, true));
    }
    if (e.type == "inputChange" || e.type == "change") {
      this.dispatchEvent(new ValueChangedEvent("change", e.detail.name, this.value, true));
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    if (this._invalidTimer) {
      clearTimeout(this._invalidTimer)
    }
    this._invalidTimer = setTimeout(() => {
      this.errors = new InvalidErrors(e.detail)
      this.dispatchEvent(new InvalidEvent(e.detail))
    }, 1)
  }

  protected focusError(path: string, error: InvalidError) {
    console.log(JSON.stringify(error))
  }
}