import { html, property } from 'lit-element';
import { createField, ValueChangedEvent, CompoundField, FieldDefinition, ClickEvent, register } from '@formsey/core';

export interface NameFieldDefinition extends FieldDefinition {
  includePrefix: boolean
  includeAdditionalName: boolean
  includeSuffix: boolean
}

export class NameField extends CompoundField<NameFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object;

  renderField() {
    let fields: FieldDefinition[] = [];
    this.includeOptionalField(fields, this.definition.includePrefix, "string", "prefix", "Prefix", "honorific-prefix");
    this.includeOptionalField(fields, true, "string", "givenName", "Given name", "given-name");
    this.includeOptionalField(fields, this.definition.includeAdditionalName, "string", "additionalName", "Additional name", "additional-name");
    this.includeOptionalField(fields, true, "string", "familyName", "Family name", "family-name");
    this.includeOptionalField(fields, this.definition.includeSuffix, "string", "suffix", "Suffix", "honorific-suffix");
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
register("formsey-name", NameField, ["native", "material", "vaadin"], "address", { importPath: "@formsey/fields-compound/NameField" });