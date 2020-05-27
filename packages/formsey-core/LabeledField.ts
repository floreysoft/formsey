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
      font-family: var(--formsey-label-font-family, var(--formsey-font-family, inherit));
      font-size: var(--formsey-label-font-size, inherit);
      font-weight: var(--formsey-label-font-weight, inherit);
      color: var(--formsey-label-color, inherit);
      line-height: var(--formsey-label-line-height, inherit);
      padding: var(--formsey-label-padding, var(--fs-widget-padding, 4px 0 0 0));
      -webkit-font-smoothing: antialiased;
      transition: all 0.12s ease-out;
      opacity: 0.8;
    }

    .wrapper:focus-within .label {
      color: var(--formsey-primary-color, var(--fs-accent-color, inherit));
      opacity: 1;
    }

    .invalid {
      background-color: var(--formsey-invalod_color, var(--fs-background-color-error, #AA000044));
      padding: 0 0.5em 0.1em;
      border-radius: var(--formsey-invalid-border-radius, var(--fs-border-radius-m, 0.3em));
    }

    .error-text, .help-text {
      font-family: var(--formey-help-text-font-family, var(--formsey-font-family, inherit));
      font-size: var(--formey-help-text-font-size, smaller);
      line-height: var(--formsey-help-text-line-height, inherit);
      margin: var(--formsey-help-text-margin, 1px 0 0 0);
    }

    .error-text {
      color: var(--formsey-error-text-color, var(--lumo-error-text-color, #FC0000));
    }

    .help-text {
      color: var(--formsey-help-text-color, #757c98);
      padding: var(--formsey-help-text-padding, var(--fs-widget-padding, 4px 0 0 0));
      opacity: 0.6;
      transition: opacity 0.12s ease-out;
    }

    .required {
      color: var(--formsey-required-color, var(--fs-text-color-error));
      margin: var(--formsey-required-margin, var(--fs-widget-padding, 0 0 0 4px));
      font-family: var(--formey-required-font-family, var(--formsey-font-family, inherit));
      font-size: var(--formey-required-font-size, smaller);
      line-height: var(--formsey-required-line-height, inherit);
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