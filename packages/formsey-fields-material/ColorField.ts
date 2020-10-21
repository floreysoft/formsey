import { registerComponent } from "@formsey/core";
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { TextFieldType } from "@material/mwc-textfield/mwc-textfield.js";
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

export class ColorField extends StringField {
 protected get type() : TextFieldType {
    return "color"
  }
}

registerComponent({
  type: "color",
  tag: "formsey-color-material",
  constructor: ColorField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/ColorField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-color-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-color-material>`
  }
})