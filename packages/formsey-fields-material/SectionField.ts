import { Field, FieldDefinition, register } from '@formsey/core';
import { css, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  static get styles() {
    return [...super.styles, css`
    * {
      font-family: Roboto, sans-serif;
    }

    header {
      font-size: 1.25rem;
      font-weight: normal;
      color: var(--mdc-theme-on-primary, #ffffff);
      background-color: var(--mdc-theme-primary, #6200ee);
      padding: 4px 16px;
      clip-path: polygon(5px 0, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
    }

    footer {
      font-size: 1rem;;
      font-weight: normal;
      color: var(--mdc-theme-on-surface);
      padding: 8px 0;
    }`]
  }

  renderField() {
    return html`<header>${ifDefined(this.definition.label)}</header><footer>${ifDefined(this.definition.helpText)}</footer>`
  }
}
register("formsey-section-material", SectionField, "material", "section", "@formsey/fields-material/SectionField");