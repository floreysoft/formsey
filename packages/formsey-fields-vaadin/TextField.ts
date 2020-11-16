import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { Field } from '@formsey/core/Field';
import { FieldDefinition, TextFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { TextAreaElement } from '@vaadin/vaadin-text-field/vaadin-text-area';
import "@vaadin/vaadin-text-field/vaadin-text-area.js";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
@customElement("formsey-text-vaadin")
export class TextField extends Field<TextFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-area")
  vaadinTextArea: TextAreaElement

  render() {
    const customValidity = this.errors.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<vaadin-text-area style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @change="${this.changed}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}"></vaadin-text-area>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinTextArea.focus()
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinTextArea.validate() : this.vaadinTextArea.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinTextArea.errorMessage, false, { })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

}

getLibrary("vaadin").registerComponent("text", {
  importPath: "@formsey/fields-vaadin/TextField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-text-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-text-vaadin>`
  }
})