import { registerTheme } from '@formsey/core'

export { BooleanField } from './BooleanField'
export { CheckboxesField } from './CheckboxesField'
export { DateField } from './DateField'
export { EmailField } from './EmailField'
export { ListField } from './ListField'
export { MultipleChoiceField } from './MultipleChoiceField'
export { NumberField } from './NumberField'
export { StringField } from './StringField'
export { TextField } from './TextField'
export { VaadinField } from './VaadinField'
export { OptionalSectionField } from './OptionalSectionField'

registerTheme('vaadin', {
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
    'optionalSection': 'formsey-optional-section-vaadin',
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
})