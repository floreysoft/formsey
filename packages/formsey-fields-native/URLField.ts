import { register } from '@formsey/core';
import { StringField } from './StringField';

export class URLField extends StringField {
  protected get type() : "url" {
    return "url"
  }
}
register("native", "url", "formsey-url", URLField)
