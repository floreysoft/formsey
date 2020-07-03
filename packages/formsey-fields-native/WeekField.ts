import { DateField } from './DateField';
import { register } from '@formsey/core';

export class WeekField extends DateField {
  protected get type() : "week" {
    return "week"
  }
}
register("native", "week", "formsey-week", WeekField)