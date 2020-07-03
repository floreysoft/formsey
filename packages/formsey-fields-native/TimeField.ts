import { DateField } from './DateField';
import { register } from '@formsey/core';

export class TimeField extends DateField {
  protected get type() : "time" {
    return "time"
  }
}
register("formsey-time", TimeField, "native", "time", "@formsey/fields-native/TimeField")