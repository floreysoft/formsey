import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-phone")
export class PhoneField extends StringField {
 protected get type() : string {
    return "tel"
  }
}