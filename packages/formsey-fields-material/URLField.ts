import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class URLField extends StringField {
 protected get type() : TextFieldType {
    return "url"
  }
}

register("material", "url", "formsey-url-material", URLField)