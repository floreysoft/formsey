import { html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Field, FieldDefinition } from '@formsey/core';

export class MarkupField extends Field<FieldDefinition, string> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderStyles() {
    return `
    * {
      font-family: var(--lumo-font-family);
    }`
  }

  renderField() {
    return html`${unsafeHTML(this.definition.default)}`
  }
}

customElements.define('formsey-markup', MarkupField);