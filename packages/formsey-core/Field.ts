import { css, html, LitElement, TemplateResult } from "lit-element";
import { property } from "lit-element";
import { Components, getDefaultLibrary, getLibraries, getLibrary, Settings } from './Components';
import { FieldBlurEvent } from './FieldBlurEvent';
import { FieldClickEvent } from './FieldClickEvent';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { FieldFocusEvent } from './FieldFocusEvent';
import { InvalidError, InvalidErrors, InvalidEvent } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';

export const createField = (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string): TemplateResult => {
  const component = components[definition.type];
  if (component) {
    return component.factory(components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id)
  } else {
    const libraries = getLibraries()
    for ( let key of Object.keys(libraries) ) {
      const library = libraries[key]
      const component = library.components[definition.type]
      if ( component ) {
        // console.debug(`Field of type=${definition.type} not found in your components library, returning it from library=${key}}`);
        return component.factory(components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id)
      }
    }
    console.error(`Your form is using a field of type=${definition.type} but no matching component has been registered in any library!`);
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
  set library(librarys: string) {
    let registeredLibrary = getLibrary(librarys)
    if (registeredLibrary.components ) {
      this.components = registeredLibrary.components
    } else {
      let defaultLibrary = getDefaultLibrary()
      if (defaultLibrary) {
        console.warn("Library '" + librarys + "' not availble, using '" + defaultLibrary + "' instead")
        this.components = getLibrary(defaultLibrary).components
      } else {
        console.error("Librarys '" + librarys + "' not availble, no libraries installed!")
      }
    }
  }

  @property({ type: Boolean })
  valid: boolean = true

  @property({ type: Boolean })
  report: boolean = false

  @property({ type: Object })
  errors : InvalidErrors

  @property({ type: Object })
  customErrors : InvalidErrors

  public path(): string {
    return this.definition.name ? (this.parentPath ? (this.parentPath + "." + this.definition.name) : this.definition.name) : this.parentPath || ""
  }

  public clearCustomValidity() {
    this.customErrors = null
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    this.customErrors = customErrors
  }

  public reportValidity(path?: string): boolean {
    this.report = true
    if (this.errors.get(this.path())) {
      this.dispatchEvent(new InvalidEvent(this.errors))
      this.valid = false
    } else {
      this.valid = this.validate(true, path)
    }
    return this.valid
  }

  public checkValidity(path?: string): boolean {
    this.report = false
    if (this.errors.get(this.path())) {
      this.dispatchEvent(new InvalidEvent(this.errors))
      this.valid = false
    } else {
      this.valid = this.validate(false, path)
    }
    return this.valid
  }

  public validate(report: boolean, path?: string): boolean {
    return true
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
        this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
      }
    }
    if (!this.components) {
      let defaultLibrary = getDefaultLibrary()
      if (typeof defaultLibrary != "undefined") {
        this.components = getLibrary(defaultLibrary).components
      }
      return typeof this.components != "undefined"
    }
    return true
  }

  protected changed(e: any) {
    e.stopPropagation()
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

  protected invalid(e: InvalidEvent) {
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected firstPathElement(path: string) {
    return path.split('.')[0]
  }

  protected prependPath(path: string) {
    return (this.definition.name ? this.definition.name : "") + "." + path
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