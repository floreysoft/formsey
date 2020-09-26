import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

export class EmailField extends StringField {
  protected get type() : "email" {
    return "email"
  }
}

register({
  type: "email",
  tag: "formsey-email",
  constructor: EmailField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/EmailField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-email id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-email>`
  }
})
