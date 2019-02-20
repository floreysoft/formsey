import { TemplateResult } from 'lit-element';

export abstract class FieldFactory {
  editors : Object = {}

  registerEditor(type: string, definition: EditorDefinition) {
    this.editors[type] = definition;
  }

  edit(type: string): EditorDefinition {
    return this.editors[type] as EditorDefinition
  }

  abstract create(fieldDefinition: FieldDefinition, value: Object, handler): TemplateResult
}

export interface FieldDefinition {
  name?: string
  colspan?: number
  type?: string
  prompt?: string
  helpText?: string
  required?: boolean
  default? : any
  enabled?: boolean
  hidden?: boolean
  autofill? : string
}

export interface ImageFieldDefinition extends FieldDefinition {
  url: string
  width: string
  align: string
}

export interface BooleanFieldDefinition extends FieldDefinition {
  label?: string
  indeterminate?: boolean
  default? : boolean
}

export interface NumberFieldDefinition extends FieldDefinition {
  min: number
  max: number
}

export interface StringFieldDefinition extends FieldDefinition {
  focus? : boolean
  placeholder?: string
  maxlength? : number
  default? : string
}

export interface TextFieldDefinition extends StringFieldDefinition {
}

export interface DateFieldDefinition extends FieldDefinition {
  placeholder: string
}

export class Option {
  label: string
  value: string
}

export interface ListFieldDefinition extends FieldDefinition {
  options : Option[] | string[]
}

export interface CheckboxesFieldDefinition extends FieldDefinition {
  options : Option[] | string[]
  other? : boolean
}

export interface FormDefinition extends FieldDefinition {
  fields: FieldDefinition[]
}

export interface EditorDefinition extends FieldDefinition {
  fields: FieldDefinition[]
  named?: boolean
}

export interface RepeatingFieldDefinition extends FieldDefinition {
  min: number
  max: number
  form : FormDefinition
}

export interface SelectableSectionFieldDefinition extends FieldDefinition {
  forms : FormDefinition[]
  multipleChoice? : boolean
}

export interface OptionalSectionFieldDefinition extends FieldDefinition {
  label : string
  onForm : FormDefinition
  offForm : FormDefinition
}

export interface SignatureFieldDefinition extends FieldDefinition {
  width: number
  height: number
}