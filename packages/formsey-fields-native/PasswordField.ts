import { register } from '@formsey/core';
import { StringField } from './StringField';

export class PasswordField extends StringField {
  protected get type() : string {
    return "password"
  }
}
register("formsey-password", PasswordField)