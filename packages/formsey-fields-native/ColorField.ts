import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-color")
export class ColorField extends StringField {
 protected get type() : string {
    return "color"
  }
}