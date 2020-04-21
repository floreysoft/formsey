import { themes } from '@formsey/core'
import '@formsey/fields-material/BooleanField'
import '@formsey/fields-material/CheckboxesField'
import '@formsey/fields-material/ColorField'
import '@formsey/fields-material/DateField'
import '@formsey/fields-material/DateTimeField'
import '@formsey/fields-material/EmailField'
import '@formsey/fields-material/ListField'
import '@formsey/fields-material/NumberField'
import '@formsey/fields-material/OptionalSectionField'
import '@formsey/fields-material/PasswordField'
import '@formsey/fields-material/PhoneField'
import '@formsey/fields-material/SearchField'
import '@formsey/fields-material/SectionField'
import '@formsey/fields-material/SelectableSectionField'
import '@formsey/fields-material/StringField'
import '@formsey/fields-material/TextField'
import '@formsey/fields-material/URLField'

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

themes['material'] = {
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
    'form': 'formsey-form-field',
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
}