import { registerTheme } from '@formsey/core'

export { BooleanField } from './BooleanField'
export { CheckboxesField } from './CheckboxesField'
export { ColorField } from './ColorField'
export { DateField } from './DateField'
export { DateTimeField } from './DateTimeField'
export { EmailField } from './EmailField'
export { ListField } from './ListField'
export { MonthField } from './MonthField'
export { MultipleChoiceField } from './MultipleChoiceField'
export { NumberField } from './NumberField'
export { OptionalSectionField } from './OptionalSectionField'
export { PasswordField } from './PasswordField'
export { PhoneField } from './PhoneField'
export { SearchField } from './SearchField'
export { SectionField } from './SectionField'
export { SelectableSectionField } from './SelectableSectionField'
export { StringField } from './StringField'
export { TextField } from './TextField'
export { TimeField } from './TimeField'
export { WeekField } from './WeekField'

registerTheme('material', {
  components: {
    'boolean': 'formsey-boolean-material',
    'text': 'formsey-text-material',
    'string': 'formsey-string-material',
    'email': 'formsey-email-material',
    'phone': 'formsey-phone-material',
    'color': 'formsey-color-material',
    'password': 'formsey-password-material',
    'search': 'formsey-search-material',
    'number': 'formsey-number-material',
    'date': 'formsey-date-material',
    'datetime': 'formsey-datetime-material',
    'week': 'formsey-week-material',
    'month': 'formsey-month-material',
    'list': 'formsey-list-material',
    'signature': 'formsey-signature',
    'section': 'formsey-section-material',
    'repeatingSection': 'formsey-repeating-section',
    'optionalSection': 'formsey-optional-section-material',
    'selectableSection': 'formsey-selectable-section-material',
    'form': 'formsey-form-field-material',
    'nestedLayout': 'formsey-nested-form',
    'nestedForm': 'formsey-nested-form',
    'formEditor': 'formsey-form-editor',
    'address': 'formsey-address',
    'name': 'formsey-name',
    'creditCard': 'formsey-creditcard',
    'sourceCode': 'formsey-sourcecode',
    'markup': 'formsey-markup',
    'image': 'formsey-image',
    'youtube': 'formsey-youtube',
    'upload': 'formsey-upload-vaadin',
    'multipleChoice': 'formsey-multiple-choice-material',
    'checkboxes': 'formsey-checkboxes-material',
    'richText': 'formsey-rich-text-vaadin'
  }
})