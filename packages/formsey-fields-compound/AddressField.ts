import { CompoundField } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit-element";
import { property } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';

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
    return html`<div class="fs-nested-form">${createField(this.components, this.settings, form, this.value, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), null)}</div>`;
  }
}

register({
  type: "address",
  tag: "formsey-address",
  constructor: AddressField,
  libraries: ["native", "material", "vaadin"],
  importPath: "@formsey/fields-compound/AddessField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-address id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-address>`
  }
})