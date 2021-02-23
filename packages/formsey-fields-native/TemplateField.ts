import { LabeledField } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-template")
export class TemplateField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`${this.definition.default}`
  }
}

getLibrary("native").registerComponent("template", {
  importPath: "@formsey/fields-native/TemplateField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<FieldDefinition, string> ) => {
    return html`<formsey-markup id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-markup>`
  }
})