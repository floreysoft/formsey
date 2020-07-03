import { DateField } from './DateField';
import { register } from '@formsey/core';

export class DateTimeField extends DateField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}
register("native", "datetime", "formsey-datetime", DateTimeField)
