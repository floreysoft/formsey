import { register } from '@formsey/core';
import { StringField } from './StringField';

export class URLField extends StringField {
  protected get type() : string {
    return "url"
  }
}
register("formsey-url", URLField)