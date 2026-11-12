import { TemplateResult } from "lit";
import { ResponsiveLayout } from "./Layouts";

/**
 * Field definitions are plain JSON objects that describe a form. `type` selects
 * the component that renders the field, the remaining properties configure it.
 */
export interface Definition {
  type?: string
}
/**
 * Properties shared by all fields.
 *
 * - `name`: key of the value within the enclosing form. Fields without a name do not contribute a value.
 * - `label`: shown above the field
 * - `helpText`: shown below the field
 * - `default`: initial value
 */
export interface FieldDefinition extends Definition {
  name?: string
  label?: string | TemplateResult
  helpText?: string | TemplateResult
  default?: any
}

/** A field that arranges nested fields. */
export interface LayoutFieldDefinition extends FieldDefinition {
  layout?: ResponsiveLayout
}

/**
 * A container of fields.
 *
 * - `fields`: the nested fields
 * - `layout`: how to arrange them, per size
 * - `deferLayout`: the enclosing field applies margin, padding and background of the layout
 * - `action`, `method`, `target`: configure the native form submit
 */
export interface FormDefinition extends LayoutFieldDefinition {
  fields: FieldDefinition[]
  target?: "_blank" | "_parent" | "_self" | "_top"
  action?: string
  method?: "GET" | "POST"
  deferLayout?: boolean
}

/** A field the user can interact with. */
export interface InteractiveFieldDefinition extends FieldDefinition {
  autofocus?: boolean
  required?: boolean
  disabled?: boolean
}

/** A field with a value that can be validated. `customValidity` replaces the validation message of the browser. */
export interface InputFieldDefinition extends InteractiveFieldDefinition {
  customValidity?: string
  readonly?: boolean
  autocomplete?: "on" | "off" | "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "bday" | "bday-year" | "bday-day" | "bday-month" | "billing" | "cc-additional-name" | "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-type" | "country" | "country-name" | "current-password" | "email" | "family-name" | "fax" | "given-name" | "home" | "honorific-prefix" | "honorific-suffix" | "impp" | "language" | "mobile" | "name" | "new-password" | "nickname" | "organization" | "organization-title" | "pager" | "photo" | "postal-code" | "sex" | "shipping" | "street-address" | "tel-area-code" | "tel" | "tel-country-code" | "tel-extension" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-national" | "transaction-amount" | "transaction-currency" | "url" | "username" | "work"
}

/**
 * A button. `confirm` asks for confirmation in a popup before the click event
 * is fired, `icon` is the name of a registered icon or a template.
 */
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

/** A boolean field. `controlLabel` is shown next to the control. */
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

/** A single line text field. Also used by the email, phone, url, search and password types. */
export interface StringFieldDefinition extends InputFieldDefinition {
  placeholder?: string
  pattern?: string
  minlength?: number
  maxlength?: number
  default?: string
  autoselect?: boolean
}

/** A read only field that displays its value. */
export interface LabelFieldDefinition extends FieldDefinition {
  locale?: string
  wrap?: "wrap" | "nowrap"
}

/** Displays a number formatted with `Intl.NumberFormat`. */
export interface NumberFormatFieldDefinition extends LabelFieldDefinition {
  locale?: string
  style?: Intl.NumberFormatOptions["style"]
  notation?: string
  signDisplay?: "auto" | "never" | "always" | undefined
  useGrouping?: boolean
}

/** Displays an amount formatted with `Intl.NumberFormat`. `currency` is an ISO 4217 code. */
export interface CurrencyFormatFieldDefinition extends NumberFormatFieldDefinition {
  locale?: string
  style?: Intl.NumberFormatOptions["style"]
  currency?: string
  currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"]
  currencySign?: Intl.NumberFormatOptions["currencySign"]
}
/** Displays a date formatted with `Intl.DateTimeFormat`. */
export interface DateFormatFieldDefinition extends LabelFieldDefinition {
  locale?: string
  style?: string
  dateStyle?: "short" | "long" | "full" | "medium"
  timeStyle?: "short" | "long" | "full" | "medium"
  notation?: string
}
/** File upload. The value is a list of files with their content as data URL. */
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

/** A choice of a list, select, checkboxes or multiple choice field. */
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

/** Selects one (or with `multiselect` several) of the options. A search box is shown above `searchThreshold` options. */
export interface ListFieldDefinition extends InputFieldDefinition {
  options: Option[]
  max?: number
  searchThreshold?: number
  hideCheckmark?: boolean
  multiselect?: boolean
  query?: string
}

/** Selects any number of the options. `other` adds a free text choice. */
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
/** A form the user can add repeatedly. The value is an array with one entry per repetition. */
export interface RepeatingFieldDefinition extends FormDefinition {
  min: number
  max: number
}

/** A form that is shown while its `value` is selected. */
export interface Selection extends FormDefinition {
  label: string
  value: string
  icon?: string | TemplateResult
}

/**
 * Shows one of several forms depending on a selection. The selected value is
 * stored in the value of the section under `key`.
 */
export interface SelectableSectionFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  control?: "list" | "multipleChoice" | "select"
  key: string,
  layout?: ResponsiveLayout
}
/** Shows one of several forms in tabs. */
export interface TabsFieldDefinition extends InputFieldDefinition {
  selections: Selection[]
  location: "top" | "bottom"
  expand: boolean
}
/** A group of buttons of which one is selected. The value is the name of the selected button. */
export interface ToggleFieldDefinition extends InputFieldDefinition {
  buttons: ButtonFieldDefinition[]
}

/** Displays {@link Records} as a table with sorting, searching, selection and paging. */
export interface TableFieldDefinition extends FormDefinition {
  selectable?: boolean,
  actions?: (ButtonFieldDefinition | DialogSectionFieldDefinition)[]
  selections?: DialogSectionFieldDefinition[]
  pageLength?: number
  key?: string
  dataSource?: boolean
}

/** A form that is only shown, and only contributes a value, while a checkbox or switch is on. */
export interface OptionalSectionFieldDefinition extends InputFieldDefinition {
  control: "checkbox" | "switch"
  controlLabel?: string
  fields: FieldDefinition[]
  layout?: ResponsiveLayout
}

/** A form that opens in a popup next to a trigger button. */
export interface PopupSectionFieldDefinition extends FormDefinition, InteractiveFieldDefinition {
  trigger?: ButtonFieldDefinition
  width?: string,
  focus?: string
}

/** A form that opens in a modal dialog. Cancelling restores the value from before the dialog was opened. */
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

/** Two forms separated by a draggable splitter. */
export interface SplitPanelDefinition extends FieldDefinition {
  direction: "horizontal" | "vertical"
  first: FormDefinition
  second: FormDefinition
}

/** The value of a table: the rows plus the state of sorting, searching, paging and selection. */
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