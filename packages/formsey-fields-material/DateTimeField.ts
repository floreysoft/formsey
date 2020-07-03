import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { DateField } from "./DateField";
import { register } from "@formsey/core";

export class DateTimeField extends DateField {
 protected get type() : TextFieldType {
    return "datetime-local"
  }
}

register("material", "datetime", "formsey-datetime-material", DateTimeField);