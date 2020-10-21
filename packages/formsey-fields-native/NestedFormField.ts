import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { NestedFormField as CoreNestedFormField } from '@formsey/core/NestedFormField';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { NESTED_FORM_STYLE } from './styles';
@customElement("formsey-nested-form")
export class NestedFormField extends CoreNestedFormField {
  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE]
  }
}

getLibrary("native").registerComponent("nestedForm", {
  importPath: "@formsey/fields-native/NestedFormField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-nested-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-nested-form>`
  }
})