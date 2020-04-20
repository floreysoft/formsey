import { customElement } from 'lit-element';
import { DateField } from './DateField';

@customElement("formsey-datetime")
export class WeekField extends DateField {
 protected get type() : string {
    return "week"
  }
}