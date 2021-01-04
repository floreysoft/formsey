import { TemplateResult } from "lit-element";
import { ResponsiveLayout } from "./ResponsiveLayout";

export interface FieldDefinition {
  name?: string
  type?: string
  label?: string | TemplateResult
  helpText?: string | TemplateResult
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
  text?: string | TemplateResult
  icon?: string
  buttonType: "button" | "submit" | "reset" | "menu" | undefined
}

export interface ImageFieldDefinition extends FieldDefinition {
  url: string
  width: string
  align: string
}

export interface SwitchFieldDefinition extends InputFieldDefinition {
  controlLabel?: string
  default?: boolean
}

export interface CheckboxFieldDefinition extends SwitchFieldDefinition {
  indeterminate?: boolean
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

export interface Option {
  label: string
  value: string
}

export interface Image {
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
  layout: "horizontal" | "vertical"
  other?: boolean
}

export interface FormDefinition extends FieldDefinition {
  fields: FieldDefinition[]
  layout?: ResponsiveLayout,
  target?: "_blank" | "_parent" | "_self" | "_top"
  action?: string
  method?: "GET" | "POST"
}

export interface RepeatingFieldDefinition extends FormDefinition {
  min: number
  max: number
}

export interface Selection {
  label: string
  value: string
  form: FormDefinition
}

export interface SelectableSectionFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  multipleChoice?: boolean
}
export interface TabsFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  location: "top" | "bottom"
}

export interface TableFieldDefinition extends FormDefinition {
  sortable?: boolean
  selectable?: boolean
}

export interface OptionalSectionFieldDefinition extends InputFieldDefinition {
  control: "checkbox" | "switch"
  controlLabel?: string
  form: FormDefinition
}

export interface SignatureFieldDefinition extends InputFieldDefinition {
  width: string
  height: string
}

export interface Records {
  sortedBy?: string
  sortDirection?: "ascending" | "descending"
  hasMore?: boolean
  pagePrevious?: any
  pageNext?: any
  pageStart?: number
  pageLength?: number
  selections?: number[]
  selectAll?: boolean
  data: Object[]
}