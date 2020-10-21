import { TemplateResult } from 'lit-element'
import { FieldDefinition, FormDefinition } from './FieldDefinitions'
import { InvalidErrors } from './InvalidEvent'

export interface Component {
  type: string,
  tag: string,
  constructor: CustomElementConstructor
  libraries: string | string[],
  importPath: string | string[],
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => TemplateResult
  module?: string,
  focusable?: boolean,
  icon?: TemplateResult,
  editor?: string | FormDefinition
}

export interface Components {
  [index: string]: Component
}

export interface Settings {
  customProperties: Object
  options: Object
}

export interface Library {
  components: Components
  icon?: TemplateResult
  displayName?: string
  settingsEditor?: FormDefinition
  onSettingsChanged?: (settings: Settings) => Settings
}

export interface Libraries {
  [index: string]: Library
}

export interface Editor extends FormDefinition {
  title: string
  fields: any
  icon: TemplateResult
  quickAccess?: boolean
  interaction?: string
  cell?: boolean
  requiresFullWidth?: boolean
}

export interface Editors {
  [index: string]: Editor
}

export interface Category {
  name: string
  displayName: string
  icon: string
  types: string[];
}

type Categories = Category[]

export function getLibraries(): Libraries {
  let libraries = window['__formseyLibraries'] as Libraries
  if (typeof libraries === "undefined") {
    console.log("Create library registry")
    libraries = {}
    window['__formseyLibraries'] = libraries
  }
  return libraries
}

export function getLibrary(name: string): Library | undefined {
  return getLibraries()?.[name]
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

export function registerLibrary(name: string, components: Components) {
  let libraries = getLibraries()
  let registeredLibrary = libraries[name]
  if (typeof registeredLibrary !== "undefined") {
    console.log("Add components to registered library='" + name + "'")
    libraries[name] = { ...registeredLibrary, components: { ...registeredLibrary.components, ...components } }
  } else {
    console.log("Add new library='" + name + "' to registry")
    libraries[name] = { components }
  }
}

export function registerComponent(component: Component) {
  if (component.tag && component.constructor) {
    if (customElements.get(component.tag)) {
      console.log("'" + component.tag + "' already exists, skipping...")
    } else {
      console.log("Registering custom element=" + component.tag);
      customElements.define(component.tag, component.constructor)
    }
  }
  if (component.libraries && component.type) {
    const libraries = [].concat(component.libraries)
    for (let library of libraries) {
      let components = {} as Components
      components[component.type] = { focusable: true, ...component }
      registerLibrary(library, components)
    }
  }
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

export function getCategory(name: string) : Category {
  for ( let category of getCategories() ) {
    if ( category.name == name ) {
      return category
    }
  }
  return null
}

export function addCategory(category: Category) {
  getCategories().push(category)
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