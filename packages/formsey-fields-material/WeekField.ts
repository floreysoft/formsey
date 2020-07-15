import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { DateField } from "./DateField";
import { register } from "@formsey/core";

export class WeekField extends DateField {
 protected get type() : TextFieldType {
    return "week"
  }
}
register("formsey-week-material", WeekField, "material", "week", { importPath: "@formsey/fields-material/WeekField"});