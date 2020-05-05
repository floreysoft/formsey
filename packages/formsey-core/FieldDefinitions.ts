export interface FieldDefinition {
  name?: string
  type?: string
  label?: string
  helpText?: string
  hidden?: boolean
  default? : any
}

export interface InputFieldDefinition extends FieldDefinition {
  autofocus? : boolean
  required?: boolean
  disabled?: boolean
  customValidity? : string
  readonly?: boolean
  autocomplete? : string
}

export interface ImageFieldDefinition extends FieldDefinition {
  url: string
  width: string
  align: string
}

export interface BooleanFieldDefinition extends InputFieldDefinition {
  indeterminate?: boolean
  default? : boolean
}

export interface NumberFieldDefinition extends InputFieldDefinition {
  min?: number
  max?: number
  step?: number
}

export interface StringFieldDefinition extends InputFieldDefinition {
  placeholder?: string
  pattern? : string
  minlength? : number
  maxlength? : number
  default? : string
  autoselect? : boolean
}

export interface TextFieldDefinition extends StringFieldDefinition {
}

export interface DateFieldDefinition extends InputFieldDefinition {
  min?: string
  max?: string
  step?: number
  placeholder?: string
}

export class Option {
  label: string
  value: string
}

export interface ListFieldDefinition extends InputFieldDefinition {
  options : Option[]
}

export interface CheckboxesFieldDefinition extends InputFieldDefinition {
  options : Option[]
  other? : boolean
}

export interface FormDefinition extends FieldDefinition {
  fields: FieldDefinition[]
  gridSmall? : string
  gridMedium? : string
  gridLarge? : string
  layout? : string
}

export interface NestedFormDefinition extends FieldDefinition {
  form: FormDefinition
}

export interface RepeatingFieldDefinition extends NestedFormDefinition {
  min: number
  max: number
}

export class Selection {
  label: string
  value: string
  form: FormDefinition
}

export interface SelectableSectionFieldDefinition extends InputFieldDefinition {
  selections : Selection[]
  multipleChoice? : boolean
}

export interface OptionalSectionFieldDefinition extends InputFieldDefinition {
  form : FormDefinition
}

export interface SignatureFieldDefinition extends InputFieldDefinition {
  width: number
  height: number
}