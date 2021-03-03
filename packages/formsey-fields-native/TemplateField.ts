import { LabeledField } from '@formsey/core';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


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