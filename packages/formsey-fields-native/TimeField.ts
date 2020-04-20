import { customElement } from 'lit-element';
import { DateField } from './DateField';

@customElement("formsey-time")
export class TimeField extends DateField {
 protected get type() : string {
    return "time"
  }
}