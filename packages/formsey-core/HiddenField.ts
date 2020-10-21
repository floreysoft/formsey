import { customElement, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Components, getLibrary, Settings } from "./Components";
import { Field } from './Field';
import { FieldDefinition } from "./FieldDefinitions";
import { InvalidErrors } from './InvalidEvent';

@customElement("formsey-hidden")
export class HiddenField extends Field<FieldDefinition, any> {
  render() {
    return html`<input type="hidden" name="${ifDefined(this.definition.name)}" .value="${this.value ? this.value : this.definition.default || ''}">`
  }
}

getLibrary("native").registerComponent("hidden", {
  importPath: "@formsey/fields-native/HiddenField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-hidden id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-hidden>`
  }
})