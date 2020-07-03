import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class ColorField extends StringField {
 protected get type() : TextFieldType {
    return "color"
  }
}
register("formsey-color-material", ColorField, "material", "color", "@formsey/fields-material/ColorField");