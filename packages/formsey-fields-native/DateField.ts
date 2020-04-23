import { DateFieldDefinition, register } from '@formsey/core';
import { InputField } from './InputField';

export class DateField extends InputField<DateFieldDefinition> {
  protected get type() : string {
    return "date"
  }
}
register("formsey-date", DateField)