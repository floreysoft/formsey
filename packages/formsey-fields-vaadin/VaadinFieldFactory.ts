import { html } from 'lit-element';

import './ListField';
import './BooleanField';
import './StringField';
import './TextField';
import './DateField';
import './RepeatingField';
import './OptionalSectionField';
import './SelectableSectionField';
import './CheckboxesField';
import './MultipleChoiceField';
import './FormField';
import './FieldsField';
import './SourceCodeField';
import './MarkupField';
import './ImageField';
import './YouTubeField';
import './UploadField';
import '@formsey/fields-compound/AddressField'
import '@formsey/fields-compound/CreditCardField'
import '@formsey/fields-compound/NameField'

import { FieldFactory, FieldDefinition } from '@formsey/core';

export class VaadinFieldFactory extends FieldFactory {
  supportedFieldTypes = {
    'boolean': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-boolean @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-boolean>`,
    'string': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-string @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-string>`,
    'text': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-text @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-text>`,
    'number': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-number @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-number>`,
    'date': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-date @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-date>`,
    'list': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-list @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-list>`,
    'multipleChoice': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-multiple-choice @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-multiple-choice>`,
    'checkboxes': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-checkboxes @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-checkboxes>`,
    'signature': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-signature @valueChanged="${handler}" .definition="${fieldDefinition}" .value="${value}"></formsey-signature>`,
    'repeatingSection': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-repeating-section @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-repeating-section>`,
    'optionalSection': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-optional-section @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-optional-section>`,
    'seletableSection': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-selectable-section @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-selectable-section>`,
    'form': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-form @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-form>`,
    'fields': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-fields @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-fields>`,
    'address': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-address @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-address>`,
    'name': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-name @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-name>`,
    'creditCard': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-creditcard @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-credit-card>`,
    'richText': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-rich-text @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-rich-text>`,
    'sourceCode': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-sourcecode @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-sourcecode>`,
    'markup': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-markup @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-markup>`,
    'image': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-image @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-image>`,
    'youtube': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-youtube @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-youtube>`,
    'upload': (fieldDefinition: FieldDefinition, value, handler) => html`<formsey-upload @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"></formsey-upload>`
  }

  create(fieldDefinition: FieldDefinition, value: Object, handler) {
    if (fieldDefinition.type) {
      let factory = this.supportedFieldTypes[fieldDefinition.type];
      if (factory) {
        return factory(fieldDefinition, value, handler);
      }
    }
  }
}