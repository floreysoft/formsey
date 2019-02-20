import { html } from 'lit-element';

import './BooleanField';
import { FieldDefinition, FieldFactory } from '@formsey/core';

export class MaterialFieldFactory extends FieldFactory {
  supportedFieldTypes = {
    'boolean': (fieldDefinition: FieldDefinition, value, handler) => html`<material-boolean-field @valueChanged="${handler}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'number': (fieldDefinition: FieldDefinition, value, handler) => html`<native-number-field @valueChanged="${handler}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'string': (fieldDefinition: FieldDefinition, value, handler) => html`<vaadin-string-field @valueChanged="${handler}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'date': (fieldDefinition: FieldDefinition, value, handler) => html`<native-date-field @valueChanged="${handler}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'signature': (fieldDefinition: FieldDefinition, value, handler) => html`<native-signature-field @valueChanged="${handler}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'repeating': (fieldDefinition: FieldDefinition, value, handler) => html`<native-repeating-field @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}"  .value="${value}"> `,
    'form': (fieldDefinition: FieldDefinition, value, handler) => html`<native-form-field @valueChanged="${handler}" .factory="${this}" .definition="${fieldDefinition}" .value="${value}"> `
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