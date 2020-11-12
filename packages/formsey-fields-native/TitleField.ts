import { Field } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
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
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-title id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-title>`
  }
})