import { DateField } from './DateField';
import { register } from '@formsey/core';

export class DateTimeField extends DateField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}
register("formsey-datetime", DateTimeField, "native", "datetime", { importPath: "@formsey/fields-native/DateTimeField"})