import { TemplateResult } from 'lit';
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { InvalidErrors } from './InvalidEvent';
import { Layout } from './Layouts';

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

export interface Resources<D extends FieldDefinition, V> {
  id?: string
  library: Library
  definition: D
  context: any
  settings?: Settings
  value?: V
  parentPath: string
  errors?: InvalidErrors
  changeHandler?: any
  clickHandler?: any
  invalidHandler?: any
}

export interface Component {
  importPath: string | string[],
  template: (resources: Resources<FieldDefinition, any>) => TemplateResult
  renderer?: string,
  module?: string,
  focusable?: boolean
  nestedFields?: (definition: FieldDefinition, value: any) => FieldDefinition[]
}

export interface Components {
  [index: string]: Component
}

export type Settings = Object

export class Library {
  components: Components = {}
  icon?: TemplateResult
  displayName?: string
  settingsEditor?: FieldDefinition
  defaultSettings?: Settings
  onSettingsChanged?: (settings: Settings) => Settings

  registerComponent(type: string, component: Component) {
    this.components[type] = { focusable: true, ...component }
  }
}

export interface Libraries {
  [index: string]: Library
}

export interface Editor extends FieldDefinition {
  title: string
  icon: TemplateResult
  interaction?: string
  summary?: (definition: FieldDefinition) => TemplateResult
  prepareFieldsForLayout?: (context: any) => FieldDefinition[]
  prepareDefaultLayout?: (context: any) => Layout
}

export interface FormEditor extends Editor, FormDefinition { }

export interface LayoutEditor extends Editor {
  parentFields?: FieldDefinition[]
  isMatching(layout: Layout): boolean
}

export interface Editors {
  [index: string]: Editor
}

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

export interface Formatter {
  boxStyle?(layout: Layout, ...context: any): string
  backgroundStyle?(layout: Layout, ...context: any): string
  containerStyle?(layout: Layout, ...context: any): string
  fieldStyle?(layout: Layout, ...context: any): string
}

export type Formatters = { [index: string]: Formatter }

export function getUniqueElementId(): string {
  let counter = (window as any)['__formseyElementId'] as number
  if (typeof counter === "undefined") {
    counter = 0;
  }
  counter++;
  (window as any)['__formseyElementId'] = counter
  return "__fel-" + counter
}

export function getLibraries(): Libraries {
  return getRegistry("libraries")
}

export function getLibrary(name: string): Library {
  const libraries = getLibraries()
  let library = libraries[name]
  if (typeof library === "undefined") {
    library = new Library()
    libraries[name] = library
  }
  return library
}

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
    console.log("Create registry")
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

export function getEditor(name: string, context?: any): Editor | undefined {
  const editor = get("editors", name)
  if (typeof editor == "function") {
    return editor(context)
  }
  return editor as Editor
}

export function registerEditor(name: string, editor: Editor | ((context: any) => Editor)) {
  register("editors", name, editor)
}

export function getRendererEditors(): { [key: string]: string | undefined } {
  return getRegistry("rendererEditors")
}

export function getRendererEditor(name: string): string | undefined {
  return get("rendererEditors", name)
}

export function registerRendererEditor(name: string, rendererEditor: string) {
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

export function getIcon(name: string): TemplateResult | undefined {
  return get("icons", name)
}

export function registerIcon(name: string, template: TemplateResult) {
  register("icons", name, template)
}

export function getFormatters(): Formatters {
  return getRegistry("formatters", {})
}

export function getFormatter(name: string): Formatter | undefined {
  return get("formatters", name)
}

export function registerFormatter(name: string, formatter: Formatter) {
  register("formatters", name, formatter)
}

export function setLanguage(lang: string) {
  (window as any)['__lang'] = lang
}

export type Value = string | number;
export type Values = { [key: string]: Value };

export function translate(path: string, values?: Values): string {
  const lang = (window as any)['__lang'] || "en"
  const messages = get("messages", lang)
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

export function registerMessages(locale: string, messages: { [key: string]: any }) {
  const allMessages = getMessages(locale);
  register("messages", locale, messages)
}

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