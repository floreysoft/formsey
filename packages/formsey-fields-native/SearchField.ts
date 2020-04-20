import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-search")
export class SearchField extends StringField {
 protected get type() : string {
    return "search"
  }
}