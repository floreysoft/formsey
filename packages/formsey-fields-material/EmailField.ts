import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class EmailField extends StringField {
 protected get type() : TextFieldType {
    return "email"
  }
}
register("formsey-email-material", EmailField, "material", "email", "@formsey/fields-material/EmailField");