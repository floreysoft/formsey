import { DateField } from './DateField';
import { register } from '@formsey/core';

export class TimeField extends DateField {
  protected get type() : string {
    return "time"
  }
}
register("formsey-time", TimeField)