import { registerTheme } from '@formsey/core'

export { BooleanField } from './BooleanField'
export { ColorField } from './ColorField'
export { DateField } from './DateField'
export { DateTimeField } from './DateTimeField'
export { EmailField } from './EmailField'
export { URLField } from './URLField'
export { ImageField } from './ImageField'
export { MarkupField } from './MarkupField'
export { MonthField } from './MonthField'
export { NumberField } from './NumberField'
export { OptionalSectionField } from './OptionalSectionField'
export { PasswordField } from './PasswordField'
export { PhoneField } from './PhoneField'
export { RepeatingSectionField as RepeatingField } from './RepeatingSectionField'
export { SearchField } from './SearchField'
export { SectionField } from './SectionField'
export { SelectableSectionField } from './SelectableSectionField'
export { StringField } from './StringField'
export { TextField } from './TextField'
export { TimeField } from './TimeField'
export { WeekField } from './WeekField'
export { YouTubeField } from './YouTubeField'
export { ListField } from './ListField'
export { MultipleChoiceField } from './MultipleChoiceField'


registerTheme('native', {
  components: {
    'boolean': 'formsey-boolean',
    'text': 'formsey-text',
    'string': 'formsey-string',
    'email': 'formsey-email',
    'phone': 'formsey-phone',
    'color': 'formsey-color',
    'password': 'formsey-password',
    'url': 'formsey-url',
    'search': 'formsey-search',
    'number': 'formsey-number',
    'date': 'formsey-date',
    'time': 'formsey-time',
    'datetime': 'formsey-datetime',
    'week': 'formsey-week',
    'month': 'formsey-month',
    'list': 'formsey-list',
    'multipleChoice': 'formsey-multiple-choice',
    'checkboxes': 'formsey-checkboxes',
    'section': 'formsey-section',
    'repeatingSection': 'formsey-repeating-section',
    'optionalSection': 'formsey-optional-section',
    'selectableSection': 'formsey-selectable-section',
    'form': 'formsey-form-field',
    'nestedLayout': 'formsey-nested-form',
    'nestedForm': 'formsey-nested-form',
    'formEditor': 'formsey-form-editor',
    'address': 'formsey-address',
    'name': 'formsey-name',
    'creditCard': 'formsey-creditcard',
    'richText': 'formsey-rich-text-vaadin',
    'markup': 'formsey-markup',
    'image': 'formsey-image',
    'youtube': 'formsey-youtube',
    'upload': 'formsey-upload-vaadin'
  }
})