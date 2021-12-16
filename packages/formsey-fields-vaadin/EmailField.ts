import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/email-field";
import { EmailField as VaadinEmailField } from '@vaadin/email-field';
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { InputField } from './InputField';

@customElement("formsey-email-vaadin")
export class EmailField extends InputField<StringFieldDefinition, string> {
  @query("vaadin-email-field")
  vaadinField: VaadinEmailField | undefined

  renderField(customValidity: string) {
    if (this.definition) {
      return html`<vaadin-email-field style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText as string}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-email-field>`
    }
  }
}

getLibrary("vaadin").registerComponent("email", {
  importPath: "@formsey/fields-vaadin/EmailField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-email-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-email-vaadin>`
  }
})