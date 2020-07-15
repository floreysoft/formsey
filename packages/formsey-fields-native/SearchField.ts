import { StringField } from './StringField';
import { register } from '@formsey/core';

export class SearchField extends StringField {
  protected get type() : "search" {
    return "search"
  }
}
register("formsey-search", SearchField, "native", "search", { importPath: "@formsey/fields-native/SearchField"})