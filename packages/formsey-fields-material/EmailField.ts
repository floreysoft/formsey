import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { StringField } from '.';

@customElement("formsey-email-material")
export class EmailField extends StringField {
 protected get type() : TextFieldType {
    return "email"
  }
}