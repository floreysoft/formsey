import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { NestedFormField as CoreNestedFormField } from '@formsey/core/NestedFormField';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { NESTED_FORM_STYLE } from './styles';

export class NestedFormField extends CoreNestedFormField {
  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE]
  }
}

register({
  type: "nestedForm",
  tag: "formsey-nested-form",
  constructor: NestedFormField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/NestedFormField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-nested-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-nested-form>`
  }
})