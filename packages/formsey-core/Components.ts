import { TemplateResult } from 'lit-element'
import { FieldDefinition, FormDefinition } from './FieldDefinitions'
import { InvalidErrors } from './InvalidEvent'

export interface Component {
  tag: string,
  constructor: CustomElementConstructor
  type: string,
  libraries: string|string[],
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => TemplateResult
  importPath: string | string[],
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
  components: Components,
  icon?: TemplateResult,
  displayName?: string,
  settingsEditor?: FormDefinition
  onSettingsChanged?: (settings : Settings ) => Settings
}

export interface Libraries {
  [index: string]: Library
}

export function getLibraries() : Libraries {
  return window['__formseyLibraries'] as Libraries
}

export function registerLibrary(name: string, components: Components) {
  let libraries = window['__formseyLibraries'] as Libraries
  if (typeof libraries === "undefined") {
    console.log("Create library registry")
    libraries = {}
    window['__formseyLibraries'] = libraries
  }
  let registeredLibrary = libraries[name]
  if ( typeof registeredLibrary !== "undefined") {
    console.log("Add components to registered library='"+name+"'")
    libraries[name] = { ...registeredLibrary, components: { ...registeredLibrary.components, ...components } }
  } else {
    console.log("Add new library='"+name+"' to registry")
    libraries[name] = { components }
  }
}

export function getLibrary(name: string): Library | undefined {
  let libraries = window['__formseyLibraries'] as Libraries
  return libraries ? libraries[name] : undefined
}

export function getDefaultLibrary(): string | undefined {
  let libraries = window['__formseyLibraries'] as Libraries
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

export function register(component: Component) {
  if (customElements.get(component.tag)) {
    console.log("'" + component.tag + "' already exists, skipping...")
  } else {
    console.log("Registering custom element="+component.tag);
    customElements.define(component.tag, component.constructor)
  }
  if (component.libraries && component.type ) {
    const libraries = [].concat(component.libraries)
    for(let theme of libraries) {
      let components = {} as Components
      components[component.type] = { focusable: true, ...component }
      registerLibrary(theme, components)
    }
  }
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