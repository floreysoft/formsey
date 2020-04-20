import { NumberFieldDefinition } from '@formsey/core';
import { customElement } from 'lit-element';
import { InputField } from './InputField';

@customElement("formsey-number")
export class NumberField extends InputField<NumberFieldDefinition> {
  protected get type() : string {
    return "number"
  }
}