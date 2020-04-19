import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { StringField } from '.';

@customElement("formsey-color-material")
export class ColorField extends StringField {
 protected get type() : TextFieldType {
    return "color"
  }
}