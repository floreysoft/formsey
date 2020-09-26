import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';

export class MonthField extends DateField {
  protected get type() : "month" {
    return "month"
  }
}
register({
  type: "month",
  tag: "formsey-month",
  constructor: MonthField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/MonthField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-month id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-month>`
  }
})