import { StringField } from './StringField';
import { register } from '@formsey/core';

export class SearchField extends StringField {
  protected get type() : string {
    return "search"
  }
}
register("formsey-search", SearchField)