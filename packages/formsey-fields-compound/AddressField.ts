import { CompoundField } from '@formsey/core';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


export interface AddressFieldDefinition extends FieldDefinition {
  includeAddressLine1: boolean
  includeAddressLine2: boolean
  includeCity: boolean
  includeState: boolean
  includePostalCode: boolean
  includeCountry: boolean
  labelAddressLine1: string
  labelAddressLine2: string
  labelCity: string
  labelState: string
  labelPostalCode: string
  labelCountry: string
}
@customElement("formsey-address")
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
    return html`<div class="fs-nested-form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: form, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event) })}</div>`;
  }
}

getLibrary("native").registerComponent("address", {
  importPath: "@formsey/fields-compound/AddessField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<AddressFieldDefinition, Object>) => {
    return html`<formsey-address id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-address>`
  }
})