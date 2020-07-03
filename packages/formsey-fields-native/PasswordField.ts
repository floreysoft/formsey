import { register } from '@formsey/core';
import { StringField } from './StringField';

export class PasswordField extends StringField {
  protected get type() : "password" {
    return "password"
  }
}
register("native", "password", "formsey-password", PasswordField)
