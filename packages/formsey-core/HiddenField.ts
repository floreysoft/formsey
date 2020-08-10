import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { register } from "./Components";
import { FieldDefinition } from "./FieldDefinitions";
import { Field } from './Field';

export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : this.definition.default || ''}">`
  }
}
register("formsey-hidden", HiddenField, "native", "hidden", { importPath: "@formsey/fields-native/HiddenField"})