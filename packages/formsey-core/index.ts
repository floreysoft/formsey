import { FieldDefinition } from './FieldDefinitions'
import { TemplateResult } from 'lit-element'

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

export let themes : Themes = {}

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