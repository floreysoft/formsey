import { Field, FieldDefinition, InputFieldDefinition } from '@formsey/core';
import { css, html, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export abstract class MaterialField<T extends FieldDefinition, V> extends Field<T, V> {
  static get styles() {
    return [...super.styles, css`
    .wrapper {
      box-sizing: border-box;
      transition: all 0.2s ease-out;
    }

    .invalid {
      background-color: var(--formsey-invalod_color, var(--lumo-error-color-10pct, #ff000005));
      padding: 0 0.5rem 0.1rem;
      margin: 0.1rem 0;
      border-radius: var(--formsey-invalid-border-radius, var(--lumo-border-radius-m, 0.2em));
    }

    .error-text {
      color: var(--formsey-error-text-color, var(--lumo-error-text-color, #ff0000));
      font-family: var(--formsey-prompt-font-family, var(--lumo-font-family));
      font-size: var(--formsey-error-font-size, var(--lumo-font-size-s));
      line-height: var(--formsey-error-line-height, var(--lumo-line-height-s));
    }

    .prompt {
      margin: var(--formsey-prompt-margin, var(--lumo-space-m) 0 0 0);
      font-family: var(--formsey-prompt-font-family, var(--lumo-font-family));
      font-size: var(--formsey-prompt-font-size, var(--lumo-font-size-m));
      line-height: var(--formsey-prompt-line-height, var(--lumo-line-height-m));
      color: var(--formsey-prompt-color, var(--lumo-secondary-text-color));
    }

    .required {
      position: relative;
      top: var(--formey-required-top, -6px);
      margin: var(--formsey-required-margin, 0 0 0 var(--lumo-space-xs));
      font-family: var(--formey-required-font-family, var(--lumo-font-family));
      font-size: var(--formey-required-font-size, var(--lumo-font-size-xs));
      line-height: var(--formsey-required-line-height, var(--lumo-line-height-xs));
      color: var(--formsey-required-color, var(--lumo-error-text-color));
    }
    .help-text {
      font-family: var(--formey-help-text-font-family, var(--lumo-font-family));
      font-size: var(--formey-help-text-font-size, var(--lumo-font-size-xs));
      line-height: var(--formsey-help-text-line-height, var(--lumo-line-height-xs));
      color: var(--formsey-help-text-color, var(--lumo-secondary-text-color));
    }`]
  }

  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ wrapper: true, invalid: !this.valid && this.report })}">${this.renderHeader()}${this.renderField()}${this.renderFooter()}</div>`
  }

  protected renderHeader(): TemplateResult | void {
    let required = false
    if (this.definition.hasOwnProperty('required') ) {
      required = (<InputFieldDefinition>this.definition).required
    }
    return html`
      ${this.definition.prompt ? html`<div class="prompt">${this.definition.prompt}${required ? html`<span class="required">*</span>` : html``}</div>` : undefined}
      ${this.definition.helpText ? html`<div class="help-text">${this.definition.helpText}</div>` : undefined}`
  }

  protected renderFooter(): TemplateResult | void {
    if (this.definition.hasOwnProperty('customValidity') ) {
      let validityMessage = (<InputFieldDefinition>this.definition).customValidity
      if (this.error) {
        validityMessage = this.error.validityMessage
      }
      return this.report && typeof validityMessage !== "undefined" ? html`<div class="error-text">${validityMessage}</div>` : undefined
    }
  }
}