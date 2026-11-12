import { TemplateResult } from 'lit';
import { FieldChangeEvent } from './Events';
import { FieldClickEvent } from './Events';
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { FieldInputEvent } from './Events';
import { InvalidErrors, InvalidEvent } from './InvalidEvent';
import { Layout } from './Layouts';
import { Form } from './Form';

/**
 * The registry is the global lookup for everything that is pluggable: component
 * libraries, icons, layout formatters, editors and translations. It lives on
 * `window.__formsey` so that separately loaded bundles share one instance.
 *
 * Formsey bundles may be loaded more than once on a page. Make
 * `customElements.define` log instead of throw when an element is registered twice.
 */
let customElementRegistry = window.customElements;
// @ts-ignore
if (!customElementRegistry.oldDefine) {
  // @ts-ignore
  customElementRegistry.oldDefine = customElementRegistry.define
  customElementRegistry.define = function (tag, cstr) {
    try {
      // @ts-ignore
      return customElementRegistry.oldDefine(tag, cstr)
    } catch (exception) {
      console.error(`Error while registering web component: ${tag}`, exception)
    }
  }
}

/** Reads a value from nested data using a path like `"a.b[0].c"`. */
export function resolve(data: { [key: string]: any }, path: string): any {
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
      found = data[token.substring(0, token.indexOf('['))][index]
    } else {
      found = data[token]
    }
    if (found && path) {
      return resolve(found, path)
    } else {
      return found
    }
  }
}

/**
 * Everything a component template needs to render a field: the definition, the
 * value and the event handlers of the parent.
 */
export interface Resources<D extends FieldDefinition, V> {
  id?: string
  library?: Library
  definition?: D
  context?: any
  settings?: Settings
  value?: V
  parentPath?: string
  errors?: InvalidErrors
  inputHandler?: (e: FieldInputEvent<any>) => void
  changeHandler?: (e: FieldChangeEvent<any>) => void
  clickHandler?: (e: FieldClickEvent) => void
  invalidHandler?: (e: InvalidEvent) => void
}

/**
 * A field type of a library.
 *
 * - `importPath`: module(s) that define the custom element
 * - `template`: creates the template that renders the field
 * - `focusable`: false for fields that cannot receive focus (default: true)
 * - `nestedFields`: returns the fields contained in a container field
 * - `migrateDefinition` / `migrateValue`: upgrade data saved by older versions
 */
export interface Component<D extends FieldDefinition, V> {
  importPath: string | string[],
  template: (resources: Resources<D, V>) => TemplateResult
  renderer?: string,
  module?: string,
  focusable?: boolean
  nestedFields?: (definition: D, value: V) => FieldDefinition[]
  migrateDefinition?(from: number, definition: D) : D
  migrateValue?(from: number, value: V) : V
}

export interface Components {
  [index: string]: Component<any, any>
}

/** Library specific settings, e.g. the theme of a form. */
export type Settings = { [key: string]: any }

/**
 * A set of components that render field definitions with a common look and
 * feel, e.g. "native", "material" or "vaadin".
 */
export class Library {
  components: Components = {}
  icon?: TemplateResult
  displayName?: string
  settingsEditor?: FieldDefinition
  defaultSettings?: Settings
  onSettingsChanged?: (settings: Settings) => Settings
  themeColor?: (settings: Settings) => string
  backgroundColor?: (settings: Settings) => string

  /** Registers the component that renders fields of the given type. */
  registerComponent<D extends FieldDefinition, V>(type: string, component: Component<D, V>) {
    this.components[type] = { focusable: true, ...component }
  }
}

export interface Libraries {
  [index: string]: Library
}

export type EditValueTransformer = (value: any, context: any) => any

/** Form used by the form designer to edit the definition of a field type. */
export interface Editor extends FormDefinition  {
  title: string
  icon: TemplateResult
  interaction?: string
  transformIn?: EditValueTransformer
  transformOut?: EditValueTransformer
  summary?: (definition: FieldDefinition) => TemplateResult
  prepareFieldsForLayout?: (context: any) => FieldDefinition[]
  prepareDefaultLayout?: (context: any) => Layout
  buttonClicked?: (event: FieldClickEvent, value: any, context: any) => any
}

export interface FormEditor extends Editor, FormDefinition { }

export interface LayoutEditor extends Editor {
  parentFields?: FieldDefinition[]
  isMatching(layout: Layout): boolean
}

export interface Editors {
  [index: string]: Editor
}

/** Group of field types shown in the palette of the form designer. */
export interface Category {
  name: string
  displayName: string
  types: string[];
  icon?: TemplateResult
}

export type Categories = Category[]

export interface Icons {
  [index: string]: TemplateResult
}

/**
 * Translates a {@link Layout} into inline CSS.
 *
 * - `containerStyle`: style of the element that contains the fields
 * - `fieldStyle`: style of the wrapper of a single field
 * - `outerBoxStyle` / `innerBoxStyle`: margin, shadow, border and padding
 * - `backgroundStyle` / `elevationStyle`: background color and elevation overlay
 */
export interface Formatter {
  innerBoxStyle?(layout?: Layout, ...context: any): string
  outerBoxStyle?(layout?: Layout, ...context: any): string
  backgroundStyle?(layout?: Layout, ...context: any): string
  elevationStyle?(layout?: Layout, ...context: any): string
  containerStyle?(layout?: Layout, ...context: any): string
  fieldStyle?(layout?: Layout, ...context: any): string
  backgroundStyle?(layout?: Layout, ...context: any): string
}

export type Formatters = { [index: string]: Formatter }

/** Returns a page wide unique element id. */
export function getUniqueElementId(): string {
  let counter = (window as any)['__formseyElementId'] as number
  if (typeof counter === "undefined") {
    counter = 0;
  }
  counter++;
  (window as any)['__formseyElementId'] = counter
  return "__fel-" + counter
}

/** All registered libraries by name. */
export function getLibraries(): Libraries {
  return getRegistry("libraries")
}

/** Returns the library with the given name and creates it if it does not exist yet. */
export function getLibrary(name: string): Library {
  const libraries = getLibraries()
  let library = libraries[name]
  if (typeof library === "undefined") {
    library = new Library()
    libraries[name] = library
  }
  return library
}

/** The library that has been registered first, used by fields without an explicit library. */
export function getDefaultLibrary(): Library | undefined {
  let libraries = getLibraries()
  if (typeof libraries != "undefined") {
    let avaliableLibraries = Object.values(libraries)
    if (avaliableLibraries.length == 0) {
      return undefined;
    } else {
      return avaliableLibraries[0]
    }
  }
  return undefined
}

function getRegistry(name: string, init?: any): any {
  let registries = (window as any)['__formsey']
  if (typeof registries === "undefined") {
    registries = {} as Object
    (window as any)['__formsey'] = registries
  }
  let registry = registries[name]
  if (typeof registries[name] === "undefined") {
    registry = init || {}
    registries[name] = registry
  }
  return registry
}

function get<T>(registry: string, name: string): T {
  return getRegistry(registry)[name]
}

function register<T>(registry: string, name: string, item: T) {
  getRegistry(registry)[name] = item
}

export function getEditors(): Editors {
  return getRegistry("editors")
}

/** Returns the editor for a field type. Editors may be registered as factories that receive the context. */
export function getEditor(name: string, context?: any): Editor | undefined {
  const editor = get("editors", name)
  if (typeof editor == "function") {
    return editor(context)
  }
  return editor as Editor
}

/** Registers the form used to edit definitions of the given field type. */
export function registerEditor(name: string, editor: Editor | ((context: any) => Editor)) {
  register("editors", name, editor)
}

export function getRendererEditors(): { [key: string]: Editor | undefined } {
  return getRegistry("rendererEditors")
}

export function getRendererEditor(name: string): Editor | undefined {
  return get("rendererEditors", name)
}

export function registerRendererEditor(name: string, rendererEditor: Editor) {
  register("rendererEditors", name, rendererEditor)
}

export function getCategories(): Categories {
  return getRegistry("categories", [])
}

export function getCategory(name: string): Category | null {
  for (let category of getCategories()) {
    if (category.name == name) {
      return category
    }
  }
  return null
}

export function addCategory(category: Category) {
  getCategories().push(category)
}

export function getIcons(): Icons {
  return getRegistry("icons")
}

/** Returns a registered icon, e.g. `getIcon("Plus")`. */
export function getIcon(name: string): TemplateResult | undefined {
  return get("icons", name)
}

/** Registers an icon. Definitions refer to icons by name. */
export function registerIcon(name: string, template: TemplateResult) {
  register("icons", name, template)
}

export function getFormatters(): Formatters {
  return getRegistry("formatters", {})
}

/** Returns the formatter that implements the layout with the given name. */
export function getFormatter(name: string): Formatter | undefined {
  return get("formatters", name)
}

/** Registers the formatter for a layout, e.g. "columns", "areas", "flex" or "table". */
export function registerFormatter(name: string, formatter: Formatter) {
  register("formatters", name, formatter)
}

/** Sets the language used by {@link translate}. */
export function setLanguage(lang: string) {
  (window as any)['__lang'] = lang
}

export type Value = string | number;
export type Values = { [key: string]: Value };

/**
 * Looks up a message for the current language and replaces `{placeholders}`.
 * Returns the path itself if no messages are registered for the language.
 */
export function translate(path: string, values?: Values): string {
  const lang = (window as any)['__lang'] || "en"
  const messages = get<{ [key: string]: any; }>("messages", lang)
  if (messages) {
    let message = resolve(messages, path)
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, value)
      })
    }
    return message
  } else {
    return path
  }
}

export function getMessages(lang: string): Formatters {
  return get("messages", lang)
}

/** Registers the messages for a locale. */
export function registerMessages(locale: string, messages: { [key: string]: any }) {
  const allMessages = getMessages(locale);
  register("messages", locale, messages)
}

/**
 * Name of the grid area of a field: its name or, for unnamed fields, its type
 * followed by the index among the fields of the same type (e.g. `title0`).
 */
export function area(field: FieldDefinition, fields: FieldDefinition[]): string {
  let area = field.name || ""
  if (area == "") {
    let typeCounter = 0
    area = field.type || ""
    fields.forEach(formField => {
      if (field === formField) {
        area += typeCounter
      }
      if (formField.type === field.type) {
        typeCounter++
      }
    })
  }
  return area
}