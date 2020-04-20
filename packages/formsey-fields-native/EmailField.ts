import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-email")
export class EmailField extends StringField {
 protected get type() : string {
    return "email"
  }
}