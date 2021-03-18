import { Field } from '@formsey/core';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';

@customElement("formsey-title")
export class TitleField extends Field<FieldDefinition, void> {
  render() {
    return html`${this.definition?.label ? html`<div class="lfl">${this.definition.label}</div>` : undefined}${this.definition?.helpText ? html`<div class="lfht">${this.definition.helpText}</div>` : undefined}`
  }
}

getLibrary("native").registerComponent("title", {
  importPath: "@formsey/fields-native/TitleField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FieldDefinition, void>) => {
    return html`<formsey-title id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-title>`
  }
})