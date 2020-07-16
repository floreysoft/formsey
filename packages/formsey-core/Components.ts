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

export interface Theme {
  components: Components,
  icon?: TemplateResult,
  displayName?: string
}

export interface Themes {
  [index: string]: Theme
}

export function getThemes() : Themes {
  return window['__formseyThemes'] as Themes
}

export function registerTheme(name: string, theme: Theme) {
  let themes = window['__formseyThemes'] as Themes
  if (typeof themes === "undefined") {
    console.log("Create themes registry")
    themes = {}
    window['__formseyThemes'] = themes
  }
  let registeredTheme = themes[name]
  if ( typeof registeredTheme !== "undefined") {
    console.log("Add components to registered theme='"+name+"'")
    themes[name] = { ...registerTheme, components: { ...registeredTheme.components, ...theme.components }}
  } else {
    console.log("Add new theme='"+name+"' to registry")
    themes[name] = theme
  }
}

export function getTheme(name: string): Theme | undefined {
  let themes = window['__formseyThemes'] as Themes
  return themes ? themes[name] : undefined
}

export function getDefaultTheme(): string | undefined {
  let themes = window['__formseyThemes'] as Themes
  if (typeof themes != "undefined") {
    let avaliableThemes = Object.keys(themes)
    if (avaliableThemes.length == 0) {
      return undefined;
    } else {
      return avaliableThemes[0]
    }
  }
  return undefined
}

export function register(tag: string, constructor: CustomElementConstructor, themes?: string|string[], type?: string, component?: Component) {
  if (customElements.get(tag)) {
    console.log("'" + tag + "' already exists, skipping...")
  } else {
    console.log("Registering custom element="+tag);
    customElements.define(tag, constructor)
  }
  if (themes && type && component) {
    component.tag = tag
    themes = [].concat(themes)
    for(let theme of themes) {
      let components = {} as Components
      components[type] = { focusable: true, ...component }
      registerTheme(theme, { components })
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