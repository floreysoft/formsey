import { TemplateResult } from 'lit-element'
import { FieldDefinition } from './FieldDefinitions'

export { CompoundField, createField, Field } from './Field'
export * from './FieldDefinitions'
export { Form } from './Form'
export { FormField, GridSize } from './FormField'
export { LabeledField } from './LabeledField'
export { NestedFormField } from './NestedFormField'
export { ValueChangedEvent } from './ValueChangedEvent'

export interface Components {
  [index: string]: string
}

export interface Theme {
  components: Components,
  icon? : TemplateResult,
  displayName?: string
}

export interface Themes {
  [index: string]: Theme
}

export function registerTheme(name: string, theme: Theme) {
  let themes = window['formseyThemes'] as Themes
  if ( typeof themes === "undefined" ) {
    console.log("Create themes registry")
    themes = {}
  }
  themes[name] = theme
}

export function getTheme(name: string) : Theme | undefined {
  let themes = window['formseyThemes'] as Themes
  return themes ? themes[name] : undefined
}

export function register(tag: string, constructor : CustomElementConstructor) {
  if ( customElements.get(tag) ) {
    console.log("'"+tag+"' already exists, skipping...")
  } else {
    customElements.define(tag, constructor)
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

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}