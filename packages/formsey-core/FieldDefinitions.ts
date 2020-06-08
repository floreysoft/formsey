export interface FieldDefinition {
  name?: string
  type?: string
  label?: string
  helpText?: string
  hidden?: boolean
  default?: any
}

export interface InputFieldDefinition extends FieldDefinition {
  autofocus?: boolean
  required?: boolean
  disabled?: boolean
  customValidity?: string
  readonly?: boolean
  autocomplete?: string
}

export interface ImageFieldDefinition extends FieldDefinition {
  url: string
  width: string
  align: string
}

export interface BooleanFieldDefinition extends InputFieldDefinition {
  indeterminate?: boolean
  default?: boolean
}

export interface NumberFieldDefinition extends InputFieldDefinition {
  min?: number
  max?: number
  step?: number
}

export interface StringFieldDefinition extends InputFieldDefinition {
  placeholder?: string
  pattern?: string
  minlength?: number
  maxlength?: number
  default?: string
  autoselect?: boolean
}

export interface UploadFieldDefinition extends InputFieldDefinition {
  multiple: boolean
  accept?: string[]
  capture?: string
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

export class Image {
  value: string
  label?: string
  src?: string
  alt?: string
}

export interface ImagesFieldDefinition extends InputFieldDefinition {
  multiple?: boolean
  columnWidth?: number,
  minColumns?: number,
  maxColumns?: number,
  images: Image[]
}

export interface ListFieldDefinition extends InputFieldDefinition {
  options: Option[]
}

export interface CheckboxesFieldDefinition extends InputFieldDefinition {
  options: Option[]
  other?: boolean
}

export interface Breakpoints {
  xxs?: number
  xs?: number
  s?: number
  m?: number
  l?: number
  xl?: number
  xxl?: number
}

export interface Grids {
  xxs?: string
  xs?: string
  s?: string
  m?: string
  l?: string
  xl?: string
  xxl?: string
}

export interface Layout {
  style: string
  breakpoints: Breakpoints
  grids : Grids
}

export interface FormDefinition extends FieldDefinition {
  fields: FieldDefinition[]
  layout?: Layout
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
  selections: Selection[]
  multipleChoice?: boolean
}

export interface OptionalSectionFieldDefinition extends InputFieldDefinition {
  form: FormDefinition
}

export interface SignatureFieldDefinition extends InputFieldDefinition {
  width: number
  height: number
}