import { DateFieldDefinition } from '@formsey/core';
import { customElement } from 'lit-element';
import { InputField } from './InputField';

@customElement("formsey-date")
export class DateField extends InputField<DateFieldDefinition> {
  protected get type() : string {
    return "date"
  }
}