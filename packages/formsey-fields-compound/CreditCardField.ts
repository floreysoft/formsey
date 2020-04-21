import { html, property } from 'lit-element';
import { createField, ValueChangedEvent, CompoundField, FieldDefinition } from '@formsey/core';

export interface CreditCardFieldDefinition extends FieldDefinition {
  enabledAutofill : boolean
}

export class CreditCardField extends CompoundField<CreditCardFieldDefinition, Object> {
  @property({ converter: Object})
  value: Object;

  renderField() {
    let fields: FieldDefinition[] = [];
    this.includeOptionalField(fields, true, "string", "cardnumber", "Card Number", this.definition.enabledAutofill ? "cc-number" : "off");
    this.includeOptionalField(fields, true, "string", "cvc", "CVC",this.definition.enabledAutofill ? "cc-csc" : "off");
    this.includeOptionalField(fields, true, "string", "cardholder", "Card Holder",this.definition.enabledAutofill ? "cc-name" : "off");
    this.includeOptionalField(fields, true, "string", "expiry", "Expiry Date",this.definition.enabledAutofill ? "cc-exp" : "off");
    let form = {
      type: "form",
      name: this.definition.name,
      prompt: this.definition.prompt,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${createField(this.components, form, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>`;
  }
}

customElements.define('formsey-creditcard', CreditCardField);