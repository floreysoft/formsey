import { CompoundField } from '@formsey/core';
import { createField } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';

export interface NameFieldDefinition extends FieldDefinition {
  includePrefix: boolean
  includeAdditionalName: boolean
  includeSuffix: boolean
}
@customElement("formsey-name")
export class NameField extends CompoundField<NameFieldDefinition, Object> {
  renderField() {
    if (!this.definition) return
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
    return html`<div class="fs-nested-form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: form, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event) })}</div>`;

  }
}

getLibrary("native").registerComponent("name", {
  importPath: "@formsey/fields-compound/NameField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<NameFieldDefinition, Object>) => {
    return html`<formsey-name id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-name>`
  }
})