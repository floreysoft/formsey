import { StringFieldDefinition } from '@formsey/core';
import { customElement } from 'lit-element';
import { InputField } from './InputField';

@customElement("formsey-string")
export class StringField extends InputField<StringFieldDefinition> {
 protected get type() : string {
    return "text"
  }
}