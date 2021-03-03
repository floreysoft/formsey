import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-text-field/vaadin-email-field";
import { EmailFieldElement } from '@vaadin/vaadin-text-field/vaadin-email-field';
import { html } from "lit";
import { customElement, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-email-vaadin")
export class EmailField extends InputField<StringFieldDefinition, string> {
  @query("vaadin-email-field")
  vaadinField: EmailFieldElement

  renderField(customValidity: string) {
    return html`<vaadin-email-field style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText as string}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-email-field>`
  }
}

getLibrary("vaadin").registerComponent("email", {
  importPath: "@formsey/fields-vaadin/EmailField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-email-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-email-vaadin>`
  }
})