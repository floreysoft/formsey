import { customElement, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { getLibrary, Resources } from "./Components";
import { Field } from './Field';
import { FieldDefinition } from "./FieldDefinitions";

@customElement("formsey-hidden")
export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : this.definition.default || ''}">`
  }
}

getLibrary("native").registerComponent("hidden", {
  importPath: "@formsey/fields-native/HiddenField",
    factory: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<FieldDefinition, any> ) => {
    return html`<formsey-hidden id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-hidden>`
  }
})