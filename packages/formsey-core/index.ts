import { FieldDefinition } from './FieldDefinitions'

export { CompoundField, createField, Field } from './Field'
export * from './FieldDefinitions'
export { Form } from './Form'
export { FormField, GridSize } from './FormField'
export { LabeledField } from './LabeledField'
export { NestedFormField } from './NestedFormField'
export { ValueChangedEvent } from './ValueChangedEvent'

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