import { register } from '@formsey/core';
import { DateField } from './DateField';

export class MonthField extends DateField {
  protected get type() : "month" {
    return "month"
  }
}
register("native", "month", "formsey-month", MonthField)