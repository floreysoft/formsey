import { customElement } from 'lit-element';
import { StringField } from './StringField';
import { register } from '@formsey/core';

export class ColorField extends StringField {
 protected get type() : string {
    return "color"
  }
}
register("formsey-color", ColorField)