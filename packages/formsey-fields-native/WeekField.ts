import { DateField } from './DateField';
import { register } from '@formsey/core';

export class WeekField extends DateField {
  protected get type() : string {
    return "week"
  }
}
register("formsey-week", WeekField)