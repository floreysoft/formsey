import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { customElement } from 'lit-element';
import { StringField } from './StringField';

@customElement("formsey-search-material")
export class SearchField extends StringField {
 protected get type() : TextFieldType {
    return "search"
  }
}