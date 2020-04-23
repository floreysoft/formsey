import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { Components, getDefaultTheme, getTheme } from '.';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { InvalidError, InvalidErrors } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';

export function hacktml(parts, ...args) {
  const newArgs = args.concat().slice(1, -1)
  const newParts = parts.concat().slice(1, -1)
  newParts[0] = "<" + args[0] + newParts[0]
  newParts[newParts.length - 1] = newParts[newParts.length - 1] + args[0] + ">";
  return html(newParts, ...newArgs);
}

export const createField = (components: Components, definition: FieldDefinition, value: Object, errors: InvalidErrors, valueChangedHandler: any, invalidHandler: any): TemplateResult => {
  const tag = components[definition.type];
  if (tag) {
    return hacktml`<${tag} .components=${components} .definition=${definition} .value=${value} .errors=${errors} @valueChanged=${valueChangedHandler} @invalid=${invalidHandler}></${tag}>`;
  } else {
    console.error("Your form is using a field of type=" + definition.type + " but no matching tag has been found in your components!");
  }
  return html``;
}

export abstract class Field<T extends FieldDefinition, V> extends LitElement {
  @property({ converter: Object })
  components: Components

  @property({ type: Object })
  definition: T

  @property({ type: Object })
  value: V;

  @property({ type: String })
  set theme(theme : string) {
    let registeredTheme = getTheme(theme)
    if ( registeredTheme ) {
      this.components = registeredTheme.components
    } else {
      let defaultTheme = getDefaultTheme()
      if ( defaultTheme ) {
        console.warn("Theme '"+theme+"' not availble, using '"+defaultTheme+"' instead")
        this.components = getTheme[defaultTheme].components
      } else {
        console.error("Theme '"+theme+"' not availble, no theme installed!")
      }
    }
  }

  @property({ type: Boolean })
  valid: boolean = true

  @property({ type: Boolean })
  report: boolean = false

  @property({ type: Object })
  set errors(errors: InvalidErrors) {
    this.error = undefined
    if (errors && this.definition.name) {
      this.error = errors[this.definition.name];
    }
    this._errors = errors;
    this.requestUpdate();
  }

  get errors() {
    return this._errors
  }

  _errors: InvalidErrors = {}
  error: InvalidError | undefined

  public reportValidity(): boolean {
    this.clearErrors()
    this.report = true
    this.valid = this.validate(true)
    if (this.valid && this.error) {
      this.valid = false
    }
    return this.valid
  }

  public checkValidity(): boolean {
    this.clearErrors()
    this.report = false
    this.valid = this.validate(false)
    if (this.valid && this.error) {
      this.valid = false
    }
    return this.valid
  }

  public validate(report: boolean): boolean {
    return true
  }

  public resize(): void {}

  static get styles() {
    return [css`
    .hidden {
      display: none;
    }`]
  }

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    if (this.definition.hidden) {
      return false
    }
    if ( !this.components ) {
      let defaultTheme = getDefaultTheme()
      if ( typeof defaultTheme != "undefined" ) {
        this.components = getTheme(defaultTheme).components
      }
      return typeof this.components != "undefined"
    }
    return true
  }

  protected render(): void | TemplateResult {
    return html`${this.renderField()}`
  }

  protected abstract renderField(): TemplateResult | void;

  protected checkProperties(): void {
  }

  protected update(changedProperties: never) {
    this.checkProperties();
    super.update(changedProperties);
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected firstPathElement(path: string) {
    if (path) {
      let index = path.indexOf('.')
      if (index > 0) {
        return path.substring(0, index)
      }
    }
    return path;
  }

  protected prependPath(path: string) {
    return (this.definition.name ? this.definition.name : "") + "." + path
  }

  private clearErrors() {
    // Keep custom errors
    if (this.errors) {
      for (let key in this.errors) {
        let error = this.errors[key]
        if (!error.custom) {
          delete this.errors[key]
        }
      }
    } else {
      this.errors = {}
    }
    if (this.error && !this.error.custom) {
      this.error = undefined
    }
  }
}

export abstract class CompoundField<T extends FieldDefinition, V> extends Field<T, V> {
  protected renderHeader() {
  }

  protected includeOptionalField(fields: InputFieldDefinition[], include: boolean, type: string, name: string, helpText: string, autocomplete: string) {
    if (include) {
      fields.push({
        type: type,
        name: name,
        helpText: helpText,
        autocomplete: autocomplete
      })
    }
  }
}