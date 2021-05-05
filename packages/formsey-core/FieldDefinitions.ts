import { TemplateResult } from "lit";
import { ResponsiveLayout } from "./Layouts";

export interface Definition {
  type?: string
}
export interface FieldDefinition extends Definition {
  name?: string
  label?: string | TemplateResult
  helpText?: string | TemplateResult
  default?: any
}

export interface LayoutFieldDefinition extends FieldDefinition {
  layout?: ResponsiveLayout
}

export interface FormDefinition extends LayoutFieldDefinition {
  fields: FieldDefinition[]
  target?: "_blank" | "_parent" | "_self" | "_top"
  action?: string
  method?: "GET" | "POST"
  deferLayout?: boolean
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
  icon?: string | TemplateResult
  tooltip?: string
  buttonType?: "button" | "submit" | "reset" | "menu"
  align?: "left" | "center"
  theme?: "default" | "primary",
  classes?: string
  confirm?: boolean
  confirmationMessage?: string
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

export interface NumberUnitFieldDefinition extends NumberFieldDefinition, ToggleFieldDefinition {
}

export interface StringFieldDefinition extends InputFieldDefinition {
  placeholder?: string
  pattern?: string
  minlength?: number
  maxlength?: number
  default?: string
  autoselect?: boolean
}

export interface LabelFieldDefinition extends FieldDefinition {
  locale?: string
  format?: string
  style?: {
    selection?: string
    value?: {
      currency?: string
      currencyDisplay?: string
      currencySign?: string
      unit?: string
      unitDisplay?: string
    }
  }
  notation?: string
  signDisplay?: string
  useGrouping?: boolean
  unit?: string
  unitDisplay?: string
  wrap?: "wrap" | "nowrap"
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
  icon?: TemplateResult | string
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
  max?: number
  searchThreshold?: number
  hideCheckmark?: boolean
  multiselect?: boolean
  query?: string
}

export interface CheckboxesFieldDefinition extends InputFieldDefinition {
  options: Option[]
  layout: "horizontal" | "vertical"
  other?: boolean
}

export interface PanelFieldDefinition extends FormDefinition {
  icon?: string | TemplateResult
}

export interface ResponsivePanelFieldDefinition extends FieldDefinition {
  reverse?: boolean
  first: PanelFieldDefinition
  second: PanelFieldDefinition
}
export interface RepeatingFieldDefinition extends FormDefinition {
  min: number
  max: number
}

export interface Selection extends FormDefinition {
  label: string
  value: string
  icon?: string | TemplateResult
}

export interface SelectableSectionFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  control?: "list" | "multipleChoice" | "select"
  layout?: ResponsiveLayout
}
export interface TabsFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  location: "top" | "bottom"
  expand: boolean
}
export interface ToggleFieldDefinition extends InputFieldDefinition {
  buttons: ButtonFieldDefinition[]
}

export interface TableFieldDefinition extends FormDefinition {
  selectable?: boolean,
  actions?: (ButtonFieldDefinition | DialogSectionFieldDefinition)[]
  selections?: ButtonFieldDefinition[]
  pageLength?: number
  key?: string
  dataSource?: boolean
}

export interface OptionalSectionFieldDefinition extends InputFieldDefinition {
  control: "checkbox" | "switch"
  controlLabel?: string
  fields: FieldDefinition[]
  layout?: ResponsiveLayout
}

export interface PopupSectionFieldDefinition extends FormDefinition, InteractiveFieldDefinition {
  trigger?: ButtonFieldDefinition
  width?: string,
  focus?: string
}

export interface DialogSectionFieldDefinition extends PopupSectionFieldDefinition {
  header?: string
  heightUnit?: "em" | "px"
  actions?: ButtonFieldDefinition[],
  height?: string
}


export interface SignatureFieldDefinition extends InputFieldDefinition {
  width: string
  height: string
}

export interface SplitPanelDefinition extends FieldDefinition {
  direction: "horizontal" | "vertical"
  first: FormDefinition
  second: FormDefinition
}

export interface Records {
  search?: { [key: string] : string}
  sortedBy?: string
  sortDirection?: "ascending" | "descending"
  dataSource?: {
    canNext?: boolean
    canPrevious?: boolean
    canFirst?: boolean
    canLast?: boolean
  }
  pageStart?: number
  selections?: string[]
  data: { [key: string] : any}[]
}