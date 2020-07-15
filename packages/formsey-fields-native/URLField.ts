import { register } from '@formsey/core';
import { StringField } from './StringField';

export class URLField extends StringField {
  protected get type() : "url" {
    return "url"
  }
}
register("formsey-url", URLField, "native", "url", { importPath: "@formsey/fields-native/URLField"})