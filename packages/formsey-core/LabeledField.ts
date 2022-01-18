import { html, TemplateResult } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { Field } from './Field';
import { FieldDefinition, InputFieldDefinition } from './FieldDefinitions';
import { getUniqueElementId } from './Registry';


export abstract class LabeledField<T extends FieldDefinition, V> extends Field<T, V> {
  protected elementId = getUniqueElementId()

  protected render() : TemplateResult | undefined {
    return html`<div class="${classMap({ lfw: true, lfi: !this.valid && this.report })}">${this.renderHeader()}${this.renderFooter()}</div>`
  } 

  protected abstract renderField(): TemplateResult | undefined

  protected renderHeader(): TemplateResult | undefined {
    let required = false
    if (this.definition?.hasOwnProperty('required')) {
      required = (<InputFieldDefinition>this.definition).required || false
    }
    return this.definition?.label ? html`<label class="lfl" id="${this.elementId}">${this.definition.label}${required ? html`<span class="lfr">&#9679;</span>` : undefined}</label>${this.renderField()}` : this.renderField()
  }

  protected renderFooter(): TemplateResult | undefined {
    const error = this.errors?.get(this.path())
    const validityMessage = error?.validityMessage || (<InputFieldDefinition>this.definition).customValidity
    let help = this.definition?.helpText
    let helpText = help ? html`<div class="lfht">${help}</div>` : undefined
    return !this.valid && this.report && validityMessage ? html`<div class="lfet">${validityMessage}</div>` : helpText
  }
}