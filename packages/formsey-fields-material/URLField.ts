import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-url-material")
export class URLField extends StringField {
 protected get type() : TextFieldType {
    return "url"
  }
}