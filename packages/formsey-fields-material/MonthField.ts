import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { DateField } from "./DateField";

@customElement("formsey-month-material")
export class MonthField extends DateField {
 protected get type() : TextFieldType {
    return "month"
  }
}