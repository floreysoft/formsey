import { FieldDefinition, InputFieldDefinition, LabeledField } from '@formsey/core';
import { css, html, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export abstract class MaterialField<T extends FieldDefinition, V> extends LabeledField<T, V> {
  render() {
    const customValidity = this.errors.get(this.path())?.validityMessage || (<InputFieldDefinition>this.definition).customValidity
    return html`<mwc-formfield label="${this.definition.label}"></mwc-formfield>${this.renderField(customValidity)}${this.definition.helpText ? html`<div class="lfht">${ifDefined(this.definition.helpText)}</div>` : undefined}`
  }

  abstract renderField(customValidity?: string) : TemplateResult | undefined
}