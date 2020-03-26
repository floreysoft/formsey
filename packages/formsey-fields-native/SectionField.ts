import { Field, FieldDefinition } from '@formsey/core';
import { css, customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-section")
export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  static get styles() {
    return [...super.styles, css`
    * {
      font-family: var(--lumo-font-family);
    }`]
  }

  renderField() {
    return html`<h1>${ifDefined(this.definition.prompt)}</h1><h2>${ifDefined(this.definition.helpText)}</h2>`
  }
}