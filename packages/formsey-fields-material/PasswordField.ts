import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class PasswordField extends StringField {
 protected get type() : TextFieldType {
    return "password"
  }
}
register("formsey-password-material", PasswordField, "material", "password", { importPath: "@formsey/fields-material/PasswordField"});