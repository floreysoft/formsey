import "@material/mwc-textfield/mwc-textfield.js";
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { StringField } from './StringField';
import { register } from "@formsey/core";

export class SearchField extends StringField {
 protected get type() : TextFieldType {
    return "search"
  }
}
register("formsey-search-material", SearchField, "material", "search", "@formsey/fields-material/SearchField");