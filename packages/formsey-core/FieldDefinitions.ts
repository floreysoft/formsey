import { TemplateResult } from "lit-element"

export interface FieldDefinition {
  name?: string
  type?: string
  label?: string | TemplateResult
  helpText?: string | TemplateResult
  hidden?: boolean
  default?: any
}

export interface InteractiveFieldDefinition extends FieldDefinition {
  autofocus?: boolean
  required?: boolean
  disabled?: boolean
}

export interface InputFieldDefinition extends InteractiveFieldDefinition {
  customValidity?: string
  readonly?: boolean
  autocomplete?: "on" | "off" | "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday" | "bday-year" | "bday-day" | "bday-month" | "billing" | "cc-additional-name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "email" | "family-name" | "fax" | "given-name" | "home" | "honorific-prefix" | "honorific-suffix" | "impp" | "language" | "mobile" | "name" | "new-password" | "nickname" | "organization" | "organization-title" | "pager" | "photo" | "postal-code" | "sex" | "shipping" | "street-address" | "tel-area-code" | "tel" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national" | "transaction-amount" | "transaction-currency" | "url" | "username" | "work"
}

export interface ButtonFieldDefinition extends InteractiveFieldDefinition {
  text: string | TemplateResult
  buttonType: "button" | "submit" | "reset" | "menu" | undefined
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
  style?: string
  breakpoints?: Breakpoints
  grids?: Grids
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