import { DateFieldDefinition, register } from '@formsey/core';
import { InputField } from './InputField';

export class DateField extends InputField<DateFieldDefinition> {
  protected get type() : "datetime" | "date" | "month" | "week" | "time" | "datetime-local" {
    return "date"
  }
}
register("formsey-date", DateField, "native", "date", "@formsey/fields-native/DateField")