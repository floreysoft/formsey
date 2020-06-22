import { TemplateResult, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { InputFieldDefinition, FieldDefinition } from './FieldDefinitions';
import { Field } from './Field';

export abstract class LabeledField<T extends FieldDefinition, V> extends Field<T, V> {
  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ lfw: true, lfi: !this.valid && this.report })}">${this.renderHeader()}${this.renderField()}${this.renderFooter()}</div>`
  }

  protected abstract renderField() : TemplateResult | void

  protected renderHeader(): TemplateResult | void {
    let required = false
    if (this.definition.hasOwnProperty('required')) {
      required = (<InputFieldDefinition>this.definition).required
    }
    return html`
      ${this.definition.label ? html`<div class="lfl">${this.definition.label}${required ? html`<span class="lfr">&#10033;</span>` : html``}</div>` : undefined}`
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

    let helpText = this.definition.helpText ? html`<div class="lfht">${this.definition.helpText}</div>` : undefined
    return this.report && validityMessage ? html`<div class="lfet">${validityMessage}</div>` : helpText
  }
}