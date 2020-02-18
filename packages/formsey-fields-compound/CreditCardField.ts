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
    this.includeOptionalField(fields, true, "string", "cardnumber", "Card Number", this.definition.enabledAutofill ? "cc-number" : "off", 4);
    this.includeOptionalField(fields, true, "string", "cvc", "CVC",this.definition.enabledAutofill ? "cc-csc" : "off", 2);
    this.includeOptionalField(fields, true, "string", "cardholder", "Card Holder",this.definition.enabledAutofill ? "cc-name" : "off", 4);
    this.includeOptionalField(fields, true, "string", "expiry", "Expiry Date",this.definition.enabledAutofill ? "cc-exp" : "off", 2);
    let form = {
      type: "form",
      name: this.definition.name,
      prompt: this.definition.prompt,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${createField(this.configuration, form, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>`;
  }
}

customElements.define('formsey-creditcard', CreditCardField);