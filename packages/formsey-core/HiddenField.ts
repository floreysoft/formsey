import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Components, register, Settings } from "./Components";
import { FieldDefinition } from "./FieldDefinitions";
import { Field } from './Field';
import { InvalidErrors } from './InvalidEvent';

export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : this.definition.default || ''}">`
  }
}

register({
  type: "hidden",
  tag: "formsey-hidden",
  constructor: HiddenField,
  libraries: ["native"],
  importPath: "@formsey/fields-native/HiddenField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-hidden id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-hidden>`
  }
})