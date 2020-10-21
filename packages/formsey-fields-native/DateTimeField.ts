import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';

export class DateTimeField extends DateField {
  protected get type() : "datetime-local" {
    return "datetime-local"
  }
}

registerComponent({
  type: "datetime",
  tag: "formsey-datetime",
  constructor: DateTimeField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/DateTimeField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-datetime id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-datetime>`
  }
})