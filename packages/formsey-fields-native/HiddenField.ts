import { Field, FieldDefinition, register } from '@formsey/core';
import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : ''}">`
  }
}
register("formsey-hidden", HiddenField, "native", "hidden", "@formsey/fields-native/HiddenField")