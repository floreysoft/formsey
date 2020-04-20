import { customElement } from 'lit-element';
import { DateField } from './DateField';

@customElement("formsey-week")
export class WeekField extends DateField {
 protected get type() : string {
    return "week"
  }
}