import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { DateField } from "./DateField";
import { register } from "@formsey/core";

export class DateTimeField extends DateField {
 protected get type() : TextFieldType {
    return "datetime-local"
  }
}
register("formsey-datetime-material", DateTimeField, "material", "datetime", { importPath: "@formsey/fields-material/DateTimeField"});