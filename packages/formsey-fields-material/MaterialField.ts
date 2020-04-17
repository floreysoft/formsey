import { FieldDefinition, LabeledField } from '@formsey/core';
import { css, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export abstract class MaterialField<T extends FieldDefinition, V> extends LabeledField<T, V> {
  static get styles() {
    return [css`
    header {
      color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.6));
      font-size: 1rem;
      line-height: 1.75rem;
      font-weight: 400;
      letter-spacing: 0.009375em;
      text-transform: inherit;
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }

    :host(:focus-within) header {
      color: var(--mdc-theme-primary, rgba(0, 0, 0, 0.8));
    }

    footer {
      color: var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6));
      font-size: 0.75rem;
      font-weight: 400;
      letter-spacing: 0.0333333em;
      text-transform: inherit;
      display: block;
      line-height: normal;
      opacity: 0;
      will-change: opacity;
      text-decoration: inherit;
      margin: 8px 0px;
      padding: 0 16px;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }

    :host(:focus-within) footer {
      opacity: 1;
    }`]
  }

  render() {
    return html`<header>${ifDefined(this.definition.prompt)}</header>${this.renderField()}${this.definition.helpText ? html`<footer>${ifDefined(this.definition.helpText)}</footer>` : undefined}`
  }
}