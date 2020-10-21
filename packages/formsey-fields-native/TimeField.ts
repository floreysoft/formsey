import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { DateField } from './DateField';

export class TimeField extends DateField {
  protected get type() : "time" {
    return "time"
  }
}

registerComponent({
  type: "time",
  tag: "formsey-time",
  constructor: TimeField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/TimeField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-time id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-time>`
  }
})
