import { Field } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-title")
export class TitleField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  render() {
    return html`${this.definition?.label ? html`<div class="lfl">${this.definition.label}</div>` : undefined}${this.definition?.helpText ? html`<div class="lfht">${this.definition.helpText}</div>` : undefined}`
  }
}

getLibrary("native").registerComponent("title", {
  importPath: "@formsey/fields-native/TitleField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<FieldDefinition, void> ) => {
    return html`<formsey-title id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-title>`
  }
})