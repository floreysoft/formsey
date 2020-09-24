import { CompoundField, createField, FieldDefinition, register, ValueChangedEvent } from '@formsey/core';
import { html } from "lit-element";
import { property } from "lit-element/lib/decorators.js";


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
      label: this.definition.label,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${createField(this.components, this.settings, form, this.value, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), null)}</div>`;
  }
}

register("formsey-creditcard", CreditCardField, ["native", "material","vaadin"], "creditCard", { importPath: "@formsey/fields-compound/CreditCardField"});
