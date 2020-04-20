import { customElement } from 'lit-element';
import { DateField } from './DateField';

@customElement("formsey-datetime")
export class DateTimeField extends DateField {
 protected get type() : string {
    return "datetime-local"
  }
}