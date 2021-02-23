import { getLibrary, Resources } from '@formsey/core/Registry';
import { NumberFieldDefinition } from '@formsey/core/FieldDefinitions';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import { NumberFieldElement } from '@vaadin/vaadin-text-field/vaadin-number-field';
import { customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';
@customElement("formsey-number-vaadin")
export class NumberField extends InputField<NumberFieldDefinition, string> {
  @query("vaadin-number-field")
  vaadinField: NumberFieldElement

  renderField(customValidity : string) {
    return html`<vaadin-number-field style="display:flex;width:100%" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" has-controls ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete=${!!this.definition.autocomplete} @change="${this.changed}" @input="${this.inputted}" name="${this.definition.name}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" preventinvalidinput="true" .value="${this.value? this.value : ''}">`
  }
}

getLibrary("vaadin").registerComponent("number", {
  importPath: "@formsey/fields-vaadin/NumberField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, string> ) => {
    return html`<formsey-number-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number-vaadin>`
  }
})