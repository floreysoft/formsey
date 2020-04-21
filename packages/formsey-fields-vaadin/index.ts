export { BooleanField } from './BooleanField'
export { CheckboxesField } from './CheckboxesField'
export { DateField } from './DateField'
export { MultipleChoiceField } from './MultipleChoiceField'
export { StringField } from './StringField'
export { EmailField } from './EmailField'
export { NumberField } from './NumberField'
export { TextField } from './TextField'
export { ListField } from './ListField'
export { VaadinField } from './VaadinField'

import { themes } from '@formsey/core'

themes['vaadin'] = {
  components: {
    'boolean': 'formsey-boolean-vaadin',
    'string': 'formsey-string-vaadin',
    'text': 'formsey-text-vaadin',
    'number': 'formsey-number-vaadin',
    'email': 'formsey-email-vaadin',
    'date': 'formsey-date-vaadin',
    'list': 'formsey-list-vaadin',
    'multipleChoice': 'formsey-multiple-choice-vaadin',
    'checkboxes': 'formsey-checkboxes-vaadin',
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