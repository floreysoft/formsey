import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { DateField } from "./DateField";

@customElement("formsey-week-material")
export class WeekField extends DateField {
 protected get type() : TextFieldType {
    return "week"
  }
}