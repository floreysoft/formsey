import { register } from '@formsey/core';
import { DateField } from './DateField';

export class MonthField extends DateField {
  protected get type() : string {
    return "month"
  }
}
register("formsey-month", MonthField)