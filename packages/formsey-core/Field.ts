import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined'
import { Components, getDefaultLibrary, getLibrary, Settings } from './Components';
import { ValueChangedEvent } from './ValueChangedEvent';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { InvalidError, InvalidErrors } from './InvalidEvent';
import { FieldClickEvent } from './FieldClickEvent';
import { FieldBlurEvent } from './FieldBlurEvent';
import { FieldFocusEvent } from './FieldFocusEvent';

function hacktml(parts, ...args) {
  const newArgs = args.concat().slice(1, -1)
  const newParts = parts.concat().slice(1, -1)
  newParts[0] = "<" + args[0] + newParts[0]
  newParts[newParts.length - 1] = newParts[newParts.length - 1] + args[0] + ">";
  return html(newParts, ...newArgs);
}

export const createField = (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string): TemplateResult => {
  const component = components[definition.type];
  if (component) {
    return hacktml`<${component.tag} id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></${component.tag}>`;
  } else {
    console.error("Your form is using a field of type=" + definition.type + " but no matching component has been registered!");
  }
  return html``;
}

export class Field<T extends FieldDefinition, V> extends LitElement {
  @property({ converter: Object })
  components: Components

  @property({ converter: Object })
  settings: Settings

  @property({ type: Object })
  definition: T

  @property({ type: Object })
  value: V;

  @property()
  parentPath: string

  @property({ type: String })
  set theme(theme: string) {
    let registeredTheme = getLibrary(theme)
    if (registeredTheme) {
      this.components = registeredTheme.components
    } else {
      let defaultTheme = getDefaultLibrary()
      if (defaultTheme) {
        console.warn("Theme '" + theme + "' not availble, using '" + defaultTheme + "' instead")
        this.components = getLibrary[defaultTheme].components
      } else {
        console.error("Theme '" + theme + "' not availble, no theme installed!")
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
      this.error = errors.get(this.definition.name)
    }
    this._errors = errors;
    this.requestUpdate();
  }

  get errors() {
    return this._errors
  }

  _errors: InvalidErrors = new InvalidErrors()
  error: InvalidError | undefined

  public path(): string {
    return this.definition.name ? (this.parentPath ? (this.parentPath + "." + this.definition.name) : this.definition.name) : this.parentPath
  }

  public clearCustomValidity() {
    this.clearErrors(true)
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    if (customErrors) {
      customErrors.forEach((error, path) => {
        error.custom = true
        this.errors.set(path, error)
        if (path = this.definition.name) {
          this.error = error
        }
      })
    }
  }

  public reportValidity(path?: string): boolean {
    this.clearErrors()
    this.report = true
    this.valid = this.validate(true, path)
    if (this.valid && this.error) {
      this.valid = false
    }
    return this.valid
  }

  public checkValidity(path?: string): boolean {
    this.clearErrors()
    this.report = false
    this.valid = this.validate(false, path)
    if (this.valid && this.error) {
      this.valid = false
    }
    return this.valid
  }

  public validate(report: boolean, path?: string): boolean {
    return true
  }

  static get styles() {
    return [css`
    .hidden {
      display: none;
    }`]
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent("change", this.definition.name, this.value));
      }
    }
    if (!this.components) {
      let defaultTheme = getDefaultLibrary()
      if (typeof defaultTheme != "undefined") {
        this.components = getLibrary(defaultTheme).components
      }
      return typeof this.components != "undefined"
    }
    return true
  }

  protected changed(e: any) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
  }

  protected inputted(e: any) {
    e.stopPropagation()
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value));
  }

  protected clicked(e: any) {
    this.dispatchEvent(new FieldClickEvent(this.path()));
  }

  protected focused(e: any) {
    e.stopPropagation()
    e.preventDefault()
    this.dispatchEvent(new FieldFocusEvent(this.path()));
  }

  protected blurred(e: any) {
    e.stopPropagation()
    e.preventDefault()
    this.dispatchEvent(new FieldBlurEvent(this.path()));
  }

  protected firstPathElement(path: string) {
    return path.split('.')[0]
  }

  protected prependPath(path: string) {
    return (this.definition.name ? this.definition.name : "") + "." + path
  }

  protected clearErrors(removeCustomErrors?: boolean) {
    // Keep custom errors
    if (this.errors) {
      this.errors.forEach((error, path) => {
        if (error.custom == removeCustomErrors) {
          this.errors.delete(path)
        }
      })
    } else {
      this.errors = new InvalidErrors()
    }
    if (this.error && this.error.custom == removeCustomErrors) {
      this.error = undefined
    }
  }
}

export abstract class CompoundField<T extends FieldDefinition, V> extends Field<T, V> {
  protected renderHeader() {
  }

  protected includeOptionalField(fields: InputFieldDefinition[], include: boolean, type: string, name: string, helpText: string, autocomplete: "on" | "off" | "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday" | "bday-year" | "bday-day" | "bday-month" | "billing" | "cc-additional-name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "email" | "family-name" | "fax" | "given-name" | "home" | "honorific-prefix" | "honorific-suffix" | "impp" | "language" | "mobile" | "name" | "new-password" | "nickname" | "organization" | "organization-title" | "pager" | "photo" | "postal-code" | "sex" | "shipping" | "street-address" | "tel-area-code" | "tel" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national" | "transaction-amount" | "transaction-currency" | "url" | "username" | "work") {
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