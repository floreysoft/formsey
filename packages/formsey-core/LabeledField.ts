import { html, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { getUniqueElementId } from './Components';
import { Field } from './Field';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';

export abstract class LabeledField<T extends FieldDefinition, V> extends Field<T, V> {
  protected elementId = getUniqueElementId()

  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ lfw: true, lfi: !this.valid && this.report })}">${this.renderHeader()}${this.renderFooter()}</div>`
  }

  protected abstract renderField() : TemplateResult | void

  protected renderHeader(): TemplateResult | void {
    let required = false
    if (this.definition.hasOwnProperty('required')) {
      required = (<InputFieldDefinition>this.definition).required
    }
    return this.definition.label ? html`<label class="lfl" id="${this.elementId}">${this.definition.label}${required ? html`<span class="lfr">&#10033;</span>` : undefined}</label>${this.renderField()}` : this.renderField()
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
    let help = this.definition.helpText
    let helpText = help ? html`<div class="lfht">${help}</div>` : undefined
    return !this.valid && this.report && validityMessage ? html`<div class="lfet">${validityMessage}</div>` : helpText
  }
}