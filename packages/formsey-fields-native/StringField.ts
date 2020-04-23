import { register, StringFieldDefinition } from '@formsey/core';
import { InputField } from './InputField';

export class StringField extends InputField<StringFieldDefinition> {
  protected get type() : string {
    return "text"
  }
}
register("formsey-string", StringField)