import { TemplateResult } from 'lit-element'
import { FieldDefinition, FormDefinition } from './FieldDefinitions'
import { InvalidErrors } from './InvalidEvent'

export interface Component {
  importPath: string | string[],
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => TemplateResult
  module?: string,
  focusable?: boolean,
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

export interface Editor extends FormDefinition {
  title: string
  fields: any
  icon: TemplateResult
  interaction?: string
  cell? : boolean
  summary?: (definition: FieldDefinition) => TemplateResult
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

export interface Icons {
  [index: string]: TemplateResult
}

export type Categories = Category[]

export function getUniqueElementId(): string {
  let counter = window['__formseyElementId'] as number
  if (typeof counter === "undefined") {
    counter = 0;
  }
  counter++;
  window['__formseyElementId'] = counter
  return "__fel-"+counter
}

export function getLibraries(): Libraries {
  let libraries = window['__formseyLibraries'] as Libraries
  if (typeof libraries === "undefined") {
    console.log("Create library registry")
    libraries = {}
    window['__formseyLibraries'] = libraries
  }
  return libraries
}

export function getLibrary(name: string): Library {
  const libraries = getLibraries()
  let library = libraries[name]
  if ( typeof library === "undefined" ) {
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
  let editors = window['__formseyEditors'] as Editors
  if (typeof editors === "undefined") {
    console.log("Create editor registry")
    editors = {}
    window['__formseyEditors'] = editors
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
  let categories = window['__formseyCategories'] as Categories
  if (typeof categories === "undefined") {
    console.log("Create category registry")
    categories = []
    window['__formseyCategories'] = categories
  }
  return categories
}

export function getCategory(name: string): Category {
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
  let icons = window['__formseyIcons'] as Icons
  if (typeof icons === "undefined") {
    console.log("Create icon registry")
    icons = {}
    window['__formseyIcons'] = icons
  }
  return icons
}

export function getIcon(name: string): TemplateResult | undefined {
  return getIcons()?.[name]
}

export function registerIcon(name: string, template: TemplateResult) {
  getIcons()[name] = template
}

export function area(field: FieldDefinition, fields: FieldDefinition[]): string {
  let area = field.name
  if (!area) {
    let typeCounter = 0
    area = field.type
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