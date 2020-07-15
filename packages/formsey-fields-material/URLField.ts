import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class URLField extends StringField {
 protected get type() : TextFieldType {
    return "url"
  }
}
register("formsey-url-material", URLField, "material", "url", { importPath: "@formsey/fields-material/URLField"});