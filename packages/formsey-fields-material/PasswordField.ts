import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { StringField } from '.';

@customElement("formsey-password-material")
export class PasswordField extends StringField {
 protected get type() : TextFieldType {
    return "password"
  }
}