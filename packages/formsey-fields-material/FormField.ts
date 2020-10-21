import { FormField as CoreFormField } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { css, customElement, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
@customElement("formsey-form-field-material")
export class FormField extends CoreFormField {
  static get styles() {
    return [...super.styles, css`
      .grid {
        grid-gap: 5px;
      }

      .title {
        font-size: var(--formsey-title-font-size, 24px);
        font-size: var(--formsey-title-color, var(--mdc-theme-primary, #757c98));
      }

      .description {
        font-size: var(--formsey-description-font-size, 18px);
        font-size: var(--formsey-description-color, var(--mdc-theme-secondary, #757c98));
      }
      `];
  }
}

getLibrary("material").registerComponent("form", {
  importPath: "@formsey/fields-material/FormField",
  factory: (components: Components, settings: Settings, definition: FormDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-form-field-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-form-field-material>`
  }
})