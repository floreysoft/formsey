import { TemplateResult } from 'lit-element';
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { InvalidErrors } from './InvalidEvent';
import { Layout } from './Layouts';

let customElementRegistry = window.customElements;
// @ts-ignore
customElementRegistry.oldDefine = customElementRegistry.define
customElementRegistry.define = function (tag, cstr) {
  try {
    // @ts-ignore
    return customElementRegistry.oldDefine(tag, cstr)
  } catch (exception) {
    console.error("Error while registering component!", exception)
  }
};

export interface Resources<D extends FieldDefinition, V> {
  id?: string
  components: Components
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
  factory: (resources: Resources<FieldDefinition, any>) => TemplateResult
  module?: string,
  focusable?: boolean
}

export interface Components {
  [index: string]: Component
}

export type Settings = Object

export class Library {
  components: Components = {}
  icon?: TemplateResult
  displayName?: string
  settingsEditor?: FormDefinition
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
  cell?: boolean
  summary?: (definition: FieldDefinition) => TemplateResult
}

export interface FormEditor extends Editor, FormDefinition { }

export interface LayoutEditor extends Editor {
  fields?: FieldDefinition[]
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
  containerStyle(layout: Layout, ...context: any): string
  fieldStyle(layout: Layout, ...context: any): string
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
  let libraries = (window as any)['__formseyLibraries'] as Libraries
  if (typeof libraries === "undefined") {
    console.log("Create library registry")
    libraries = {};
    (window as any)['__formseyLibraries'] = libraries
  }
  return libraries
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

export function getDefaultLibrary(): string | undefined {
  let libraries = getLibraries()
  if (typeof libraries != "undefined") {
    let avaliableLibraries = Object.keys(libraries)
    if (avaliableLibraries.length == 0) {
      return undefined;
    } else {
      return avaliableLibraries[0]
    }
  }
  return undefined
}

export function getEditors(): Editors {
  let editors = (window as any)['__formseyEditors'] as Editors
  if (typeof editors === "undefined") {
    console.log("Create editor registry")
    editors = {};
    (window as any)['__formseyEditors'] = editors
  }
  return editors
}

export function getEditor(name: string): Editor | undefined {
  return getEditors()?.[name]
}

export function registerEditor(name: string, editor: Editor) {
  getEditors()[name] = editor
}

export function getCategories(): Categories {
  let categories = (window as any)['__formseyCategories'] as Categories
  if (typeof categories === "undefined") {
    console.log("Create category registry")
    categories = [];
    (window as any)['__formseyCategories'] = categories
  }
  return categories
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
  let icons = (window as any)['__formseyIcons'] as Icons
  if (typeof icons === "undefined") {
    console.log("Create icon registry")
    icons = {};
    (window as any)['__formseyIcons'] = icons
  }
  return icons
}

export function getIcon(name: string): TemplateResult | undefined {
  return getIcons()?.[name]
}

export function registerIcon(name: string, template: TemplateResult) {
  getIcons()[name] = template
}

export function getFormatters(): Formatters {
  let formatters = (window as any)['__formseyFormatters'] as Formatters
  if (typeof formatters === "undefined") {
    console.log("Create formatter registry")
    formatters = {};
    (window as any)['__formseyFormatters'] = formatters
  }
  return formatters
}

export function getFormatter(name: string): Formatter | undefined {
  return getFormatters()?.[name]
}

export function registerFormatter(name: string, formatter: Formatter) {
  getFormatters()[name] = formatter
}

export function getMessages(): { [key: string]: any } {
  let messages = (window as any)['__formseyMessages'] as Icons
  if (typeof messages === "undefined") {
    console.log("Create message registry")
    messages = {};
    (window as any)['__formseyMessages'] = messages
  }
  return messages
}

export function translate(key: string, data: any): TemplateResult | undefined {
  return getIcons()?.[key]
}

export function registerMessages(locale: string, messages: { [key: string]: any }) {
  getMessages()[locale] = {}
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