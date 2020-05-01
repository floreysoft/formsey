import { FormField as CoreFormField, register } from '@formsey/core';
import { css } from 'lit-element';

export class FormField extends CoreFormField {
  static get styles() {
    return [...super.styles, css`
      .grid {
        grid-gap: 5px;
      }

      .title {
        font-size: 24px;
      }

      .description {
        font-size: 18px;
      }
      `];
  }
}
register('formsey-form-field-material', FormField)