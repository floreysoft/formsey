import { register } from "@formsey/core";
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

export class EmailField extends StringField {
 protected get type() : TextFieldType {
    return "email"
  }
}

register({
  type: "email",
  tag: "formsey-email-material",
  constructor: EmailField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/EmailField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-email-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-email-material>`
  }
})