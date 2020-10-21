import { CompoundField } from '@formsey/core';
import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit-element";
import { property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

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

registerComponent({
  type: "name",
  tag: "formsey-name",
  constructor: NameField,
  libraries: ["native", "material", "vaadin"],
  importPath: "@formsey/fields-compound/NameField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-name id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-name>`
  }
})