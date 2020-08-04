import { SVGTemplateResult, TemplateResult } from 'lit-element'
import { FieldDefinition, FormDefinition } from './FieldDefinitions'

export interface Component {
  importPath: string,
  tag?: string,
  focusable?: boolean,
  icon?: SVGTemplateResult,
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
  defaultImports: string[],
  icon?: TemplateResult,
  displayName?: string
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
    libraries[name] = { ...registerLibrary, components: { ...registeredLibrary.components, ...components }, defaultImports : registeredLibrary.defaultImports}
  } else {
    console.log("Add new library='"+name+"' to registry")
    libraries[name] = { components, defaultImports : null }
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

export function register(tag: string, constructor: CustomElementConstructor, libraries?: string|string[], type?: string, component?: Component) {
  if (customElements.get(tag)) {
    console.log("'" + tag + "' already exists, skipping...")
  } else {
    console.log("Registering custom element="+tag);
    customElements.define(tag, constructor)
  }
  if (libraries && type && component) {
    component.tag = tag
    libraries = [].concat(libraries)
    for(let theme of libraries) {
      let components = {} as Components
      components[type] = { focusable: true, ...component }
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