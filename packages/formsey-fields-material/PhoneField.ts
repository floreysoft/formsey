import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class PhoneField extends StringField {
 protected get type() : TextFieldType {
    return "tel"
  }
}
register("formsey-phone-material", PhoneField, "material", "phone", { importPath: "@formsey/fields-material/PhoneField"});