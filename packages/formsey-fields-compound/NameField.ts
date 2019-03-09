import { html, property } from 'lit-element';
import { ValueChangedEvent, CompoundField, FieldDefinition } from '@formsey/core';

export interface NameFieldDefinition extends FieldDefinition {
  includePrefix : boolean
  includeAdditionalName : boolean
  includeSuffix : boolean
}

export class NameField extends CompoundField<NameFieldDefinition, Object> {
  @property({ converter: Object})
  value: Object;

  renderField() {
    let fields: FieldDefinition[] = [];
    let cols = this.includeOptionalField(fields, this.definition.includePrefix, "string", "prefix", "Prefix", "honorific-prefix", 2);
    this.includeOptionalField(fields, true, "string", "givenName", "Given name", "given-name", (5-cols)+(this.definition.includeAdditionalName ? 0 : 1));
    this.includeOptionalField(fields, this.definition.includeAdditionalName, "string", "additionalName", "Additional name", "additional-name", 2);
    this.includeOptionalField(fields, true, "string", "familyName", "Family name", "family-name", (this.definition.includeSuffix ? 3 : 5) + (this.definition.includeAdditionalName ? 0 : 1));
    this.includeOptionalField(fields, this.definition.includeSuffix, "string", "suffix", "Suffix", "honorific-suffix", 2);
    let form = {
      type: "form",
      name: this.definition.name,
      prompt: this.definition.prompt,
      helpText: this.definition.helpText,
      fields: fields
    }
    return html`<div class="fs-nested-form">${this.createField(this.configuration, form, this.value, (event: ValueChangedEvent<any>) => this.valueChanged(event))}</div>`;
  }
}

customElements.define('formsey-name', NameField);