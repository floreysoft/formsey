import { customElement, property, query } from "lit/decorators.js";
import { Field } from './Field';
import { FieldChangeEvent } from './Events';
import { FieldClickEvent } from "./Events";
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { FieldInputEvent } from "./Events";
import { FormField, isFormDefinition, removeDeletedFields } from './FormField';
import { InvalidError, InvalidErrors, InvalidEvent } from './InvalidEvent';
import { getLibrary } from "./Registry";

/** Reads a value from nested data using a path like `"a.b[0].c"`. */
export function get(data: { [key: string]: any }, path: string): any {
  if (!data || !path) {
    return undefined
  }
  let tokens = path.split('.')
  let token = tokens.shift()
  if (token) {
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
}

/** Writes a value into nested data using a path like `"a.b[0].c"`. Intermediate objects must exist. */
export function set(data: { [key: string]: any }, path: string, value: any): any {
  if (!data || !path) {
    return
  }
  let tokens = path.split('.')
  let token = tokens.shift()
  if (token) {
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
}

/**
 * `<formsey-form>`: the entry point for applications.
 *
 * Renders a {@link FormDefinition} using the `styledForm` component of the
 * library, which provides the theme and the native `<form>` element.
 *
 * ```html
 * <formsey-form></formsey-form>
 * <script type="module">
 *   import '@formsey/fields-native'
 *   const form = document.querySelector('formsey-form')
 *   form.definition = { type: "form", fields: [{ type: "string", name: "name", label: "Name" }] }
 *   form.addEventListener('change', e => console.log(e.detail.name, form.value))
 * </script>
 * ```
 *
 * @fires load - once the definition has been rendered for the first time
 * @fires change - {@link FieldChangeEvent}; `detail.name` is the path of the changed field, `detail.value` the value of the form
 * @fires input - {@link FieldInputEvent}, while the user is editing
 * @fires click - {@link FieldClickEvent} when a named button has been clicked
 * @fires invalid - {@link InvalidEvent} with all errors found by a validation
 */
@customElement("formsey-form")
export class Form extends Field<FieldDefinition, any> {
  value: any | undefined

  /** Loads `{ library, definition, value, settings }` as JSON. Properties that are already set win. */
  async fetchDefinition(url: string) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.library = this.library || getLibrary(data.library)
      this.definition = this.definition || data.definition
      this.value = this.value || data.value
      this.settings = this.settings || data.settings
      this.requestUpdate();
    } catch (reason: any) {
      console.error(reason.message)
    }
  }

  /** URL to load the definition (and optionally library, value and settings) from. */
  @property()
  set src(url: string | undefined) {
    this._src = url
    if (url) {
      this.fetchDefinition(url);
    }
  }

  get src(): string | undefined {
    return this._src
  }

  /** Target of the native form submit. */
  @property()
  target: "_blank" | "_parent" | "_self" | "_top" | undefined

  @property()

  /** URL the native form is submitted to. */
  action: string | undefined
  /** HTTP method of the native form submit. */
  @property()
  method: "GET" | "POST" | undefined

  /**
   * If set, the value of the root field becomes the value of the form as is,
   * instead of being stored under the name of the field.
   */
  @property({ type: Boolean })
  anonymous: boolean | undefined

  @query(':first-child')
  form: FormField<FormDefinition, any> | undefined

  @query('form')
  nativeForm: HTMLFormElement | undefined

  private _src: string | undefined
  private _loaded: boolean = false

  // Batch invalid events
  private _invalidTimer = undefined

  protected shouldUpdate(): boolean {
    let update = super.shouldUpdate()
    if (!update) {
      update = (typeof this.definition === "undefined")
    }
    return update;
  }

  render() {
    if (this.definition) {
      (<FormDefinition>this.definition)['action'] = this.action;
      (<FormDefinition>this.definition)['method'] = this.method;
      (<FormDefinition>this.definition)['target'] = this.target;
    }
    if (!this.errors) {
      this.errors = new InvalidErrors()
    }
    return this.library?.components?.["styledForm"]?.template({ library: this.library, context: this.context, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.parentPath, errors: this.errors, clickHandler: this.clicked, changeHandler: this.changed, inputHandler: this.inputted, invalidHandler: this.invalid })
  }

  updated() {
    if (!this._loaded && this.definition) {
      this._loaded = true;
      this.dispatchEvent(new CustomEvent('load', { detail: { definition: this.definition, value: this.value, library: this.library, settings: this.settings } }))
    }
  }

  renderHeader() {
    return
  }

  /** Reads a part of the value, e.g. `getValue("address.city")`. */
  public getValue(path: string): any {
    return get(this.value, path);
  }

  /** Changes a part of the value and re-renders the form. */
  public setValue(path: string, value: any): any {
    set(this.value, path, value);
    this.value = { ...this.value }
  }

  /** Returns a part of the definition, e.g. `getField("0.label")` for the label of the first field. */
  public getField(path: string): any {
    if (this.definition) {
      if ( (<FormDefinition>this.definition).fields ) {
        return get((<FormDefinition>this.definition).fields, path);
      } else {
        return get(this.definition, path);
      }
    }
  }

  /** Changes a part of the definition and re-renders the form. */
  public setField(path: string, value: any): any {
    if (this.definition) {
      if ( (<FormDefinition>this.definition).fields ) {
        set((<FormDefinition>this.definition).fields, path, value);
      } else {
        set(this.definition, path, value);
      }
      this.definition = { ...this.definition }
    }
  }

  /**
   * Moves the focus to the field with the given path.
   * @returns true if the field has been found and focused
   */
  public focusField(path: string): boolean {
    if (this.form && typeof this.form['focusField'] === "function") {
      return this.form.focusField(path)
    }
    return false
  }

  public clearCustomValidity() {
    super.clearCustomValidity()
    this.form?.clearCustomValidity()
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    this.form?.setCustomValidity(customErrors)
  }

  public validate(report: boolean, path?: string) {
    this.errors?.clear()
    if (this.form) {
      if (report) {
        return this.form.reportValidity(path)
      } else {
        return this.form.checkValidity(path)
      }
    } else {
      return true
    }
  }

  /** Cancels the native submit if the form is invalid. */
  protected submit(e: Event) {
    if (!this.reportValidity()) {
      e.preventDefault()
    }
  }

  protected clicked(e: FieldClickEvent) {
    e.stopPropagation()
    if (e.detail.name) {
      this.dispatchEvent(new FieldClickEvent(e.detail.name, e.detail.value, true, e.closeable));
    }
  }

  protected inputted(e: FieldChangeEvent<any>) {
    this.applyEvent(e)
    this.dispatchEvent(new FieldInputEvent(e.detail.name, this.value, true));
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.applyEvent(e)
    this.dispatchEvent(new FieldChangeEvent(e.detail.name, this.value, true));
  }

  protected applyEvent(e: CustomEvent) {
    if (!this.anonymous && e.detail.name) {
      const name = e.detail.name.split(".")[0].split("[")[0]
      this.value = this.value || {}
      this.value[name] = e.detail.value;
    } else {
      this.value = e.detail.value
    }
    if (this.library && !this.anonymous && isFormDefinition(this.definition)) {
      this.value = removeDeletedFields(this.library.components, this.definition, this.value)
    }
  }

  /** Collects the invalid events of all fields of one validation run into a single event. */
  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    if (this._invalidTimer) {
      clearTimeout(this._invalidTimer)
    }
    this._invalidTimer = <any>setTimeout(() => {
      this.errors = new InvalidErrors(e.detail)
      this.dispatchEvent(new InvalidEvent(e.detail, true))
    }, 1)
  }

  protected focusError(path: string, error: InvalidError) {
    console.log(JSON.stringify(error))
  }
}