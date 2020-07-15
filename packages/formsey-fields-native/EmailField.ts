import { StringField } from './StringField';
import { register } from '@formsey/core';

export class EmailField extends StringField {
  protected get type() : "email" {
    return "email"
  }
}
register("formsey-email", EmailField, "native", "email", { importPath: "@formsey/fields-native/EmailField"})