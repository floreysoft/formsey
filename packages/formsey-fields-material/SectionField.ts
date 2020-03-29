import { Field, FieldDefinition } from '@formsey/core';
import { css, customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-section-material")
export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  static get styles() {
    return [...super.styles, css`
    * {
      font-family: Roboto, sans-serif;
    }

    header {
      font-size: var(--lumo-font-size-xl);
      font-weight: normal;
      color: var(--mdc-theme-on-primary, #ffffff);
      background-color: var(--mdc-theme-primary, #6200ee);
      padding: 0.25em 0.5em;
      margin-top: 0.25em;
      clip-path: polygon(5px 0, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
    }

    footer {
      font-size: var(--lumo-font-size-l);
      font-weight: normal;
      color: var(--lumo-body-text-color);
      padding: var(--lumo-space-s) 0 0 0;
    }`]
  }

  renderField() {
    return html`<header>${ifDefined(this.definition.prompt)}</header><footer>${ifDefined(this.definition.helpText)}</footer>`
  }
}