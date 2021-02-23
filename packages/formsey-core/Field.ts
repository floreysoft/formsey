import { LitElement, property, TemplateResult } from "lit-element";
import { Components, getDefaultLibrary, getLibraries, getLibrary, Library, Resources, Settings } from './Registry';
import { FieldBlurEvent } from './FieldBlurEvent';
import { FieldClickEvent } from './FieldClickEvent';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { FieldFocusEvent } from './FieldFocusEvent';
import { InvalidErrors, InvalidEvent } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';

export const createField = (resources: Resources<FieldDefinition, any>): TemplateResult | undefined => {
  if (!resources.definition.type) {
    throw Error("Cannot create field as type is undefined")
  }
  const component = resources.library?.components[resources.definition.type];
  if (component) {
    return component.template(resources)
  } else {
    const libraries = getLibraries()
    for (let key of Object.keys(libraries)) {
      const library = libraries[key]
      const component = library.components[resources.definition.type]
      if (component) {
        return component.template(resources)
      }
    }
    console.error(`Your form is using a field of type=${resources.definition.type} but no matching component has been registered in any library!`);
  }
  return undefined
}

export class Field<T extends FieldDefinition, V> extends LitElement {
  @property({ converter: Object })
  library: Library | undefined

  @property({ converter: Object })
  settings: Settings | undefined

  @property({ type: Object })
  definition: T | undefined

  @property({ type: Object })
  value: V | undefined

  @property({ type: Object })
  context: any

  @property()
  parentPath: string | undefined

  @property({ type: Boolean })
  valid: boolean = true

  @property({ type: Boolean })
  report: boolean = false

  @property({ type: Object })
  errors: InvalidErrors | null = null

  @property({ type: Object })
  customErrors: InvalidErrors | null = null

  public path(): string {
    return typeof this.definition?.name !== "undefined" ? (this.parentPath ? (this.parentPath + "." + this.definition.name) : this.definition.name) : this.parentPath || ""
  }

  public clearCustomValidity() {
    this.customErrors = null
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    this.customErrors = customErrors
  }

  public reportValidity(path?: string): boolean {
    this.report = true
    if (this.errors?.get(this.path())) {
      this.dispatchEvent(new InvalidEvent(this.errors))
      this.valid = false
    } else {
      this.valid = this.validate(true, path)
    }
    return this.valid
  }

  public checkValidity(path?: string): boolean {
    this.report = false
    if (this.errors?.get(this.path())) {
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

  protected shouldUpdate(changedProperties?: Map<string | number | symbol, unknown>): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
      }
    }
    if (!this.library) {
      this.library = getDefaultLibrary()
      return typeof this.library != "undefined"
    }
    if (!this.settings) {
      this.settings = getDefaultLibrary().defaultSettings
    }
    return true
  }

  protected changed(e: any) {
    e.stopPropagation()
    if (this.value !== e.currentTarget?.value) {
      this.value = e.currentTarget.value;
      this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
    }
  }

  protected inputted(e: any) {
    e.stopPropagation()
    if (this.value !== e.currentTarget?.value) {
      this.value = e.currentTarget.value;
      this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value));
    }
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
    if (this.errors) {
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }

  protected firstPathElement(path: string) {
    return path.split('.')[0]
  }

  protected prependPath(path: string) {
    return (this.definition?.name ? this.definition.name : "") + "." + path
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