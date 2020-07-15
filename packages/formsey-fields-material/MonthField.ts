import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { DateField } from "./DateField";
import { register } from "@formsey/core";

export class MonthField extends DateField {
 protected get type() : TextFieldType {
    return "month"
  }
}
register("formsey-month-material", MonthField, "material", "month", { importPath: "@formsey/fields-material/MonthField"});
