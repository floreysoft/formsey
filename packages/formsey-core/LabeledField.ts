import { TemplateResult, html, css } from 'lit-element';
import { FieldDefinition } from './FieldDefinitions';
import { Field } from '.';

export abstract class LabeledField<T extends FieldDefinition, V> extends Field<T, V> {
  static get styles() {
    return [ ...super.styles, css`
    .prompt {
      margin: var(--formey-prompt-margin, var(--lumo-space-m) 0 0 0);
      font-family: var(--formey-prompt-font-family, var(--lumo-font-family));
      font-size: var(--formey-prompt-font-size, var(--lumo-font-size-m));
      line-height: var(--formsey-prompt-line-height, var(--lumo-line-height-m));
      color: var(--formsey-prompt-color, var(--lumo-secondary-text-color));
    }
    .required {
      margin: var(--formey-required-margin, 0 0 0 var(--lumo-space-xs));
      vertical-align: var(--formsey-required-vertical-align, super);
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
     return html`${this.renderHeader()}${this.renderField()}`
  }

  protected renderHeader(): TemplateResult | void {
    return html`
      ${this.definition.prompt ? html`<div class="prompt">${this.definition.prompt}${this.definition.required ? html`<span class="required">*</span>` : html``}</div>` : html``}
      ${this.definition.helpText ? html`<div class="help-text">${this.definition.helpText}</div>` : html``}`;
  }
}