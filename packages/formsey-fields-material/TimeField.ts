import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { DateField } from "./DateField";
import { register } from "@formsey/core";

export class TimeField extends DateField {
 protected get type() : TextFieldType {
    return "time"
  }
}
register("formsey-time-material", TimeField, "material", "time", "@formsey/fields-material/TimeField");