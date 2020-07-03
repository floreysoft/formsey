import { NumberFieldDefinition, register } from '@formsey/core';
import { InputField } from './InputField';

export class NumberField extends InputField<NumberFieldDefinition> {
  protected get type() : "number" {
    return "number"
  }
}
register("native", "number", "formsey-number", NumberField)