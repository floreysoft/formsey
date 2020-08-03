import { TemplateResult, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { InputFieldDefinition, FieldDefinition } from './FieldDefinitions';
import { Field } from './Field';
import { Marked, Renderer } from '@ts-stack/markdown';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

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
    // Optional: Help text in a bubble?
    // let helpText = this.definition.helpText ? html`<div class="lfhtb">${this.definition.helpText}</div>` : undefined
    let helpText = undefined
    return html`
      ${this.definition.label ? html`<div class="lfl">${this.definition.label}${required ? html`<span class="lfr">&#10033;</span>` : html``}${helpText}</div>` : undefined}`
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
    /*
    let helpText
    if ( typeof help == "string" ) {
      help = Marked.parse(help)
      helpText = html`<div class="lfht">${unsafeHTML(help)}</div>`
    } else {
    }
    */
    return !this.valid && this.report && validityMessage ? html`<div class="lfet">${validityMessage}</div>` : helpText
  }
}