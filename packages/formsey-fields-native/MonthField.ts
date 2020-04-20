import { customElement } from 'lit-element';
import { DateField } from './DateField';

@customElement("formsey-month")
export class MonthField extends DateField {
 protected get type() : string {
    return "month"
  }
}