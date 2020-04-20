import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-password")
export class PasswordField extends StringField {
 protected get type() : string {
    return "password"
  }
}