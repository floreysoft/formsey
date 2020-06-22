import { register } from '@formsey/core';
import { StringField } from './StringField';

export class PhoneField extends StringField {
  protected get type() : "tel" {
    return "tel"
  }
}
register("formsey-phone", PhoneField)