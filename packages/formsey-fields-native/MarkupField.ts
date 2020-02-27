import { FieldDefinition, LabeledField } from '@formsey/core';
import { css, html, property, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

@customElement("formsey-markup")
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
    return html`${unsafeHTML(this.definition.default)}`
  }
}