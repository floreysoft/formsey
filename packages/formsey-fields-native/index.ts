
// import "./webpack-resolver";
import { themes } from '@formsey/core'
import '@formsey/fields-native/ColorField'
import '@formsey/fields-native/DateField'
import '@formsey/fields-native/DateTimeField'
import '@formsey/fields-native/EmailField'
import '@formsey/fields-native/ImageField'
import '@formsey/fields-native/MarkupField'
import '@formsey/fields-native/OptionalSectionField'
import '@formsey/fields-native/PasswordField'
import '@formsey/fields-native/PhoneField'
import '@formsey/fields-native/RepeatingSectionField'
import '@formsey/fields-native/SearchField'
import '@formsey/fields-native/SectionField'
import '@formsey/fields-native/SelectableSectionField'
import '@formsey/fields-native/SignatureField'
import '@formsey/fields-native/SourceCodeField'
import '@formsey/fields-native/StringField'
import '@formsey/fields-native/URLField'
import '@formsey/fields-native/YouTubeField'
import 'ace-builds/src-min-noconflict/ace.js'

export { BooleanField } from './BooleanField'
export { ColorField } from './ColorField'
export { DateField } from './DateField'
export { DateTimeField } from './DateTimeField'
export { EmailField } from './EmailField'
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
export { SignatureField } from './SignatureField'
export { SourceCodeField, SourceCodeFieldDefinition } from './SourceCodeField'
export { StringField } from './StringField'
export { TimeField } from './TimeField'
export { WeekField } from './WeekField'
export { YouTubeField } from './YouTubeField'

themes['native'] = {
  components: {
    'boolean': 'formsey-boolean',
    'text': 'formsey-text',
    'string': 'formsey-string',
    'email': 'formsey-email',
    'phone': 'formsey-phone',
    'color': 'formsey-color',
    'password': 'formsey-password',
    'search': 'formsey-search',
    'number': 'formsey-number',
    'date': 'formsey-date',
    'datetime': 'formsey-datetime',
    'week': 'formsey-week',
    'month': 'formsey-month',
    'list': 'formsey-list',
    'multipleChoice': 'formsey-multiple-choice',
    'checkboxes': 'formsey-checkboxes',
    'signature': 'formsey-signature',
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
    'sourceCode': 'formsey-sourcecode',
    'markup': 'formsey-markup',
    'image': 'formsey-image',
    'youtube': 'formsey-youtube',
    'upload': 'formsey-upload-vaadin'
  }
}