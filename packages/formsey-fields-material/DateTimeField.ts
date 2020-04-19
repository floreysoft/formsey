import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { DateField } from "./DateField";

@customElement("formsey-datetime-material")
export class DateTimeField extends DateField {
 protected get type() : TextFieldType {
    return "datetime-local"
  }
}