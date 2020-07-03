import { html, property } from 'lit-element';
import { createField, ChangeEvent, CompoundField, FieldDefinition, ClickEvent, register } from '@formsey/core';

export interface AddressFieldDefinition extends FieldDefinition {
  includeAddressLine1 : boolean
  includeAddressLine2 : boolean
  includeCity : boolean
  includeState : boolean
  includePostalCode : boolean
  includeCountry : boolean
  labelAddressLine1 : string
  labelAddressLine2 : string
  labelCity : string
  labelState : string
  labelPostalCode : string
  labelCountry : string
}

export class AddressField extends CompoundField<AddressFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object;

  renderField() {
    let fields: FieldDefinition[] = [];
    this.includeOptionalField(fields, this.definition.includeAddressLine1, "string", "addressLine1", this.definition.labelAddressLine1, "address-line1");
    this.includeOptionalField(fields, this.definition.includeAddressLine2, "string", "addressLine2", this.definition.labelAddressLine2, "address-line2");
    this.includeOptionalField(fields, this.definition.includeCity, "string", "city", this.definition.labelCity, "address-level2");
    this.includeOptionalField(fields, this.definition.includePostalCode, "string", "postalCode", this.definition.labelPostalCode, "postal-code");
    this.includeOptionalField(fields, this.definition.includeState, "string", "state", this.definition.labelState, "address-level1");
    this.includeOptionalField(fields, this.definition.includeCountry, "string", "country", this.definition.labelCountry, "country-name");
    let form = {
      type: "form",
      name: this.definition.name,
      label: this.definition.label,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${createField(this.components, form, this.value, this.path(), this.errors, (event: ChangeEvent<any>) => this.changed(event), null)}</div>`;
  }
}
register("formsey-address", AddressField, ["native", "material", "vaadin"], "address", "@formsey/fields-compound/AddessField");
