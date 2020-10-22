import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FormField as CoreFormField } from '@formsey/core/FormField';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-form-field-vaadin")
export class FormField extends CoreFormField {
}

getLibrary("vaadin").registerComponent("form", {
  importPath: "@formsey/fields-vaadin/FormField",
  factory: (components: Components, settings: Settings, definition: FormDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-form-field-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-form-field-vaadin>`
  }
})