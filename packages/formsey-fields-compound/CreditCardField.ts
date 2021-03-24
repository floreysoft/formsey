import { CompoundField } from '@formsey/core';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';



export interface CreditCardFieldDefinition extends FieldDefinition {
  enabledAutofill: boolean
}
@customElement("formsey-creditcard")
export class CreditCardField extends CompoundField<CreditCardFieldDefinition, Object> {
  renderField() {
    if (!this.definition) return
    let fields: FieldDefinition[] = [];
    this.includeOptionalField(fields, true, "string", "cardnumber", "Card Number", this.definition.enabledAutofill ? "cc-number" : "off");
    this.includeOptionalField(fields, true, "string", "cvc", "CVC", this.definition.enabledAutofill ? "cc-csc" : "off");
    this.includeOptionalField(fields, true, "string", "cardholder", "Card Holder", this.definition.enabledAutofill ? "cc-name" : "off");
    this.includeOptionalField(fields, true, "string", "expiry", "Expiry Date", this.definition.enabledAutofill ? "cc-exp" : "off");
    let form = {
      type: "form",
      name: this.definition.name,
      label: this.definition.label,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: form, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event) })}</div>`;
  }
}

getLibrary("native").registerComponent("creditCard", {
  importPath: "@formsey/fields-compound/CreditCardField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CreditCardFieldDefinition, Object>) => {
    return html`<formsey-creditcard id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-creditcard>`
  }
})