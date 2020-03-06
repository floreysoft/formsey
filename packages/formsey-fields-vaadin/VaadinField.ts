import { Field, FieldDefinition } from '@formsey/core';
import { css, html, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export abstract class VaadinField<T extends FieldDefinition, V> extends Field<T, V> {
  static get styles() {
    return [...super.styles, css`
    .wrapper {
      box-sizing: border-box;
      transition: all 0.2s ease-out;
      padding: 0 0 var(--lumo-space-xs) 0;
    }

    .invalid {
      background-color: var(--formsey-invalod_color, var(--lumo-error-color-10pct, #ff000005));
      padding: 0 0.5rem var(--lumo-space-xs);
      margin: 0.1rem 0;
      border-radius: var(--formsey-invalid-border-radius, var(--lumo-border-radius-m, 0.2em));
    }

    .help-text {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xs);
      line-height: var(--lumo-line-height-xs);
      color: var(--lumo-secondary-text-color);
    }`]
  }

  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ wrapper: true, invalid: !this.valid && this.report })}">${this.renderHeader()}${this.renderField()}${this.renderFooter()}</div>`
  }

  renderHeader() {
    return
  }

  renderFooter() {
    return this.definition.helpText ? html`<div class="help-text">${this.definition.helpText}</div>` : undefined
  }
}