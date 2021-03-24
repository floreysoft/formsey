import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-text-field/vaadin-password-field";
import { PasswordFieldElement } from '@vaadin/vaadin-text-field/vaadin-password-field';
import { html } from "lit";
import { customElement, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';


@customElement("formsey-password-vaadin")
export class PasswordField extends InputField<StringFieldDefinition, string> {
  @query("vaadin-password-field")
  vaadinField: PasswordFieldElement | undefined

  renderField(customValidity: string) {
    if (!this.definition) return
    return html`<vaadin-password-field style="display:flex" label="${ifDefined(this.definition.label)}" .revealButtonHidden="${(<any>this.settings)?.['hideRevealPasswordButton']}" .helperText="${this.definition.helpText as string}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-password-field>`
  }
}

getLibrary("vaadin").registerComponent("password", {
  importPath: "@formsey/fields-vaadin/PasswordField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-password-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-password-vaadin>`
  }
})