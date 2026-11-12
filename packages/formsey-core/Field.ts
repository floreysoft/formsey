import { LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { FieldBlurEvent, FieldChangeEvent, FieldClickEvent, FieldFocusEvent, FieldInputEvent } from './Events';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { InvalidErrors, InvalidEvent } from './InvalidEvent';
import { getDefaultLibrary, getLibraries, Library, Resources, Settings } from './Registry';

/**
 * Creates the template for a field definition.
 *
 * Looks up the component registered for `definition.type` in
 * `resources.library` and falls back to all other registered libraries, so a
 * library only needs to provide the types it wants to override.
 *
 * @returns the template, or `undefined` if no library knows the type
 * @throws if the definition has no type
 */
export const createField = (resources: Resources<FieldDefinition, any>): TemplateResult | undefined => {
  if (!resources.definition?.type) {
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

/**
 * Base class of all fields.
 *
 * A field renders one {@link FieldDefinition} and holds the matching value.
 * Fields render into light DOM by default (see {@link Field.shadowDom}), so the
 * styles of the enclosing styled form apply to them.
 *
 * @typeParam T - type of the field definition
 * @typeParam V - type of the value
 *
 * @fires change - {@link FieldChangeEvent} when the value has been committed
 * @fires input - {@link FieldInputEvent} while the value is being edited
 * @fires invalid - {@link InvalidEvent} when validation fails
 */
export class Field<T extends FieldDefinition, V> extends LitElement {
  /** Component library used to render nested fields. Defaults to the first registered library. */
  @property({ converter: Object })
  library: Library | undefined

  /** Library specific settings, e.g. theme colors. Defaults to the settings of the default library. */
  @property({ converter: Object })
  settings: Settings | undefined

  /** Describes what to render. Nothing is rendered until a definition is set. */
  @property({ type: Object })
  definition: T | undefined

  /** Current value. Initialised with `definition.default` if undefined. */
  @property({ type: Object })
  value: V | undefined

  /** Arbitrary data handed down to all nested fields, e.g. the value of the enclosing form. */
  @property({ type: Object })
  context: any

  /** Path of the enclosing field. See {@link Field.path}. */
  @property()
  parentPath: string | undefined

  /** Result of the last validation. */
  @property({ type: Boolean })
  valid: boolean = true

  /** True if the last validation was triggered by `reportValidity()`, i.e. errors should be shown. */
  @property({ type: Boolean })
  report: boolean = false

  /** Errors of the whole form. Each field picks its own entry using its path. */
  @property({ type: Object })
  errors: InvalidErrors | undefined

  /** Errors set by the application via {@link Field.setCustomValidity}. */
  @property({ type: Object })
  customErrors: InvalidErrors | undefined

  /** Set to true in a subclass to render into a shadow root instead of light DOM. */
  static shadowDom = false

  /**
   * Path of this field within the form value, e.g. `"address.city"` or `"guests[0].name"`.
   * Unnamed fields share the path of their parent.
   */
  public path(): string {
    return typeof this.definition?.name !== "undefined" && this.definition.name !== "" ? (this.parentPath ? (this.parentPath + "." + this.definition.name) : this.definition.name) : this.parentPath || ""
  }

  /** Removes the errors set via {@link Field.setCustomValidity}. */
  public clearCustomValidity() {
    this.customErrors = undefined
  }

  /** Marks fields as invalid from the outside, e.g. with errors returned by a server. */
  public setCustomValidity(customErrors: InvalidErrors) {
    this.customErrors = customErrors
  }

  /**
   * Validates the field and shows validation errors to the user.
   * @returns true if the field is valid
   */
  public reportValidity(path?: string): boolean {
    this.report = true
    if (this.customErrors?.get(this.path())) {
      this.dispatchEvent(new InvalidEvent(this.customErrors))
      this.valid = false
    } else {
      this.valid = this.validate(true, path)
    }
    return this.valid
  }

  /**
   * Validates the field without showing errors (invalid events are still fired).
   * @returns true if the field is valid
   */
  public checkValidity(path?: string): boolean {
    this.report = false
    if (this.customErrors?.get(this.path())) {
      this.dispatchEvent(new InvalidEvent(this.customErrors))
      this.valid = false
    } else {
      this.valid = this.validate(false, path)
    }
    return this.valid
  }

  /**
   * Performs the actual validation. Overridden by fields that can be invalid.
   * @param report - true if errors should be shown to the user
   */
  public validate(report: boolean, path?: string): boolean {
    return true
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return (this.constructor as typeof Field).shadowDom ? super.createRenderRoot() : this
  }

  /**
   * Blocks rendering until a definition and a library are available and applies
   * the default value from the definition.
   */
  protected shouldUpdate(changedProperties?: Map<string | number | symbol, unknown>): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.value && this.definition.name) {
        this.dispatchEvent(new FieldChangeEvent(this.path(), this.value))
      }
    }
    if (!this.library) {
      this.library = getDefaultLibrary()
      return typeof this.library != "undefined"
    }
    if (!this.settings) {
      this.settings = getDefaultLibrary()?.defaultSettings
    }
    return true
  }

  /** Handler for native change events: takes over the value and dispatches a {@link FieldChangeEvent}. */
  protected changed(e: Event) {
    e.stopPropagation()
    this.applyEvent(e)
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  /** Handler for native input events: takes over the value and dispatches a {@link FieldInputEvent}. */
  protected inputted(e: Event) {
    e.stopPropagation()
    this.applyEvent(e)
    this.dispatchEvent(new FieldInputEvent(this.path(), this.value));
  }

  /** Copies the value of the event target into this field. */
  protected applyEvent(e: Event) {
    const value = (<HTMLInputElement>e.currentTarget)?.value as any
    if (this.value !== value) {
      this.value = value;
    }
  }

  /** Re-dispatches a click of a nested field. */
  protected clicked(e: FieldClickEvent) {
    e.stopPropagation()
    this.dispatchEvent(new FieldClickEvent(e.detail.name, e.detail.value, e.bubbles, e.closeable));
  }

  /** Translates a native focus event into a {@link FieldFocusEvent} carrying the path. */
  protected focused(e: Event) {
    e.stopPropagation()
    e.preventDefault()
    this.dispatchEvent(new FieldFocusEvent(this.path()));
  }

  /** Translates a native blur event into a {@link FieldBlurEvent} carrying the path. */
  protected blurred(e: Event) {
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

/**
 * Base class for fields that are composed of a nested form generated from
 * their definition, e.g. name or address fields.
 */
export abstract class CompoundField<T extends FieldDefinition, V> extends Field<T, V> {
  protected abstract renderField(): TemplateResult | undefined

  protected render(): TemplateResult | undefined {
    return this.renderField()
  }

  protected renderHeader() {
  }

  /** Adds a field to `fields` if `include` is true. */
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