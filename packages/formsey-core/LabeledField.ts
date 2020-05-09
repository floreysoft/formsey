import { TemplateResult, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { InputFieldDefinition, FieldDefinition } from './FieldDefinitions';
import { Field } from './Field';

export abstract class LabeledField<T extends FieldDefinition, V> extends Field<T, V> {
  static get styles() {
    return [...super.styles, css`
    .wrapper {
      box-sizing: border-box;
      transition: all 0.2s ease-out;
      display: flex;
      flex-direction: column;
    }

    .label {
      font-family: var(--formsey-label-font-family, var(--formsey-font-family));
      font-size: var(--formsey-label-font-size, 14px);
      font-weight: var(--formsey-label-font-weight, 500);
      color: var(--formsey-label-color, #222b4f);
      line-height: var(--formsey-label-line-height, var(--lumo-line-height-m));
      padding: var(--formsey-label-padding, 4px 0 0);
      -webkit-font-smoothing: antialiased;
      transition: all 0.12s ease-out;
      opacity: 0.8;
    }

    .wrapper:focus-within .label {
      color: var(--formsey-primary-color,  #020b2f);
      opacity: 1;
    }

    .invalid {
      background-color: var(--formsey-invalod_color, var(--lumo-error-color-10pct, #ff000005));
      padding: 0 0.5rem 0.1rem;
      margin: 0.1rem 0;
      border-radius: var(--formsey-invalid-border-radius, var(--lumo-border-radius-m, 0.2em));
    }

    .error-text, .help-text {
      font-family: var(--formey-help-text-font-family, var(--formsey-font-family));
      font-size: var(--formey-help-text-font-size, 12px);
      line-height: var(--formsey-help-text-line-height, 1.5);
      margin: var(--formsey-help-text-margin, 2px 0 0 0);
    }

    .error-text {
      color: var(--formsey-error-text-color, var(--lumo-error-text-color, #ff0000));
    }

    .help-text {
      color: var(--formsey-help-text-color, #757c98);
      opacity: 0.6;
      transition: opacity 0.12s ease-out;
    }

    .required {
      color: var(--formsey-required-color, var(--lumo-error-text-color));
      margin: var(--formsey-required-margin, 0 0 0 4px);
      font-family: var(--formey-required-font-family, var(--formsey-font-family));
      font-size: var(--formey-required-font-size, 9px);
      line-height: var(--formsey-required-line-height, 1.75);
      vertical-align: top;
    }

    .wrapper:focus-within .help-text {
      opacity: 1;
    }
    `]
  }

  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ wrapper: true, invalid: !this.valid && this.report })}">${this.renderHeader()}${this.renderField()}${this.renderFooter()}</div>`
  }

  protected abstract renderField() : TemplateResult | void

  protected renderHeader(): TemplateResult | void {
    let required = false
    if (this.definition.hasOwnProperty('required')) {
      required = (<InputFieldDefinition>this.definition).required
    }
    return html`
      ${this.definition.label ? html`<div class="label">${this.definition.label}${required ? html`<span class="required">&#10033;</span>` : html``}</div>` : undefined}`
  }

  protected renderFooter(): TemplateResult | void {
    let validityMessage = undefined
    if (this.error) {
      if ((<InputFieldDefinition>this.definition).customValidity) {
        validityMessage = (<InputFieldDefinition>this.definition).customValidity
      } else {
        validityMessage = this.error.validityMessage
      }
    }

    let helpText = this.definition.helpText ? html`<div class="help-text">${this.definition.helpText}</div>` : undefined
    return this.report && validityMessage ? html`<div class="error-text">${validityMessage}</div>` : helpText
  }
}