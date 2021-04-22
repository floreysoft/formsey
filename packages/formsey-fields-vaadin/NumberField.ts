import { NumberFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import "@vaadin/vaadin-text-field/vaadin-number-field";
import { NumberFieldElement } from '@vaadin/vaadin-text-field/vaadin-number-field';
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-number-vaadin")
export class NumberField extends InputField<NumberFieldDefinition, string> {
  @query("vaadin-number-field")
  vaadinField: NumberFieldElement | undefined

  renderField(customValidity : string) {
    if ( !this.definition ) return
    return html`<vaadin-number-field style="display:flex;width:100%" label="${ifDefined(this.definition.label)}" .helperText="${typeof this.definition.helpText == "string" ? this.definition.helpText : ""}" has-controls ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete=${!!this.definition.autocomplete} @change="${this.changed}" @input="${this.inputted}" name="${ifDefined(this.definition.name)}" min="${ifDefined(this.definition.min)}" max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" error-message="${ifDefined(customValidity)}" ?disabled="${this.definition.disabled}" preventinvalidinput="true" .value="${this.value? this.value : ''}">`
  }
}

getLibrary("vaadin").registerComponent("number", {
  importPath: "@formsey/fields-vaadin/NumberField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id } : Resources<NumberFieldDefinition, string> ) => {
    return html`<formsey-number-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-number-vaadin>`
  }
})