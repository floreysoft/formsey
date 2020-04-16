import { FormField as CoreFormField } from '@formsey/core';
import { customElement, css } from 'lit-element';

@customElement("formsey-form-field-material")
export class FormField extends CoreFormField {
  static get styles() {
    return [...super.styles, css`
    .grid {
      grid-gap: 8px;
    }
    `]
  }
}