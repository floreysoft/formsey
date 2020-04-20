import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-url")
export class URLField extends StringField {
 protected get type() : string {
    return "url"
  }
}