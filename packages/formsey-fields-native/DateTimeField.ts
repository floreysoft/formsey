import { customElement } from 'lit-element';
import { DateField } from './DateField';
import { register } from '@formsey/core';

export class DateTimeField extends DateField {
  protected get type() : string {
    return "datetime-local"
  }
}
register("formsey-datetime", DateTimeField)
