import { StringField } from './StringField';
import { register } from '@formsey/core';

export class SearchField extends StringField {
  protected get type() : "search" {
    return "search"
  }
}
register("native", "search", "formsey-search", SearchField)