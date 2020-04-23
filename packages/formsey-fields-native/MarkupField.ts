import { FieldDefinition, LabeledField, register } from '@formsey/core';
import { css, html, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export class MarkupField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  definition: FieldDefinition;

  static get styles() {
    return [...super.styles, css`
    * {
      font-family: var(--lumo-font-family);
    }`]
  }

  renderField() {
    return html`${unsafeHTML(this.definition.default ? this.definition.default : "")}`
  }
}
register("formsey-markup", MarkupField)