import { FormField as CoreFormField, register } from '@formsey/core';
import { css } from 'lit-element';

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
register("formsey-form-field-material", FormField, "material", "form", { importPath: "@formsey/fields-material/FormField"});