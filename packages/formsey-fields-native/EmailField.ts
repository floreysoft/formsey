import { customElement } from 'lit-element';
import { StringField } from './StringField';
import { register } from '@formsey/core';

export class EmailField extends StringField {
  protected get type() : string {
    return "email"
  }
}
register("formsey-email", EmailField)