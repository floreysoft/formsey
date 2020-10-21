import { StringFieldDefinition } from '@formsey/core';
import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';

export class StringField extends InputField<StringFieldDefinition> {
  protected get type() : "text" | "search" | "tel" | "url" | "email" | "password" {
    return "text"
  }

  firstUpdated() {
    if ( this.definition?.autoselect ) {
      this.input.addEventListener('focus', e => this.input.select())
    }
  }
}

registerComponent({
  type: "string",
  tag: "formsey-string",
  constructor: StringField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/StringField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-string id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string>`
  }
})
