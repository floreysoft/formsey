import { register, StringFieldDefinition } from '@formsey/core';
import { InputField } from './InputField';

export class StringField extends InputField<StringFieldDefinition> {
  protected get type() : string {
    return "text"
  }

  firstUpdated() {
    if ( this.definition?.autoselect ) {
      this.input.addEventListener('focus', e => this.input.select())
    }
  }
}
register("formsey-string", StringField)