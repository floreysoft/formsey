import { Field } from '@formsey/core/Field';
import { TextFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { TextAreaElement } from '@vaadin/vaadin-text-field/vaadin-text-area';
import "@vaadin/vaadin-text-field/vaadin-text-area.js";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-text-vaadin")
export class TextField extends Field<TextFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("vaadin-text-area")
  vaadinTextArea: TextAreaElement | undefined

  render() {
    if (!this.definition) return
    const customValidity = this.errors?.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<vaadin-text-area style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${typeof this.definition.helpText == "string" ? this.definition.helpText : ""}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-text-area>`;
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.vaadinTextArea?.focus()
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinTextArea?.validate() || false : this.vaadinTextArea?.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    if (this.definition?.name) {
      this.errors = this.errors || new InvalidErrors()
      this.errors.set(this.definition.name, new InvalidError(this.vaadinTextArea?.errorMessage || "", false, {}))
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }

}

getLibrary("vaadin").registerComponent("text", {
  importPath: "@formsey/fields-vaadin/TextField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<TextFieldDefinition, string>) => {
    return html`<formsey-text-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-text-vaadin>`
  }
})