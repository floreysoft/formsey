import { Field, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-textarea/mwc-textarea.js";
import { TextArea } from "@material/mwc-textarea/mwc-textarea.js";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-text-material")
export class TextField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textarea")
  materialTextArea: TextArea

  render() {
    return html`<mwc-textarea label="${this.definition.label}" helper="${ifDefined(this.definition.helpText)}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${this.definition.maxlength}" .value="${this.value ? this.value : ''}"></mwc-textarea>`;
  }

  focusField(path: string) {
    if (path == this.definition.name) {
      this.materialTextArea.focus()
    }
  }
  firstUpdated() {
    this.materialTextArea.validityTransform = (newValue, nativeValidity) => {
      if (this.errors[this.definition.name] && this.errors[this.definition.name].custom) {
        return {
          valid: false,
          validityMessage: this.errors[this.definition.name].validityMessage,
          ...this.errors[this.definition.name].validityState
        };
      }
      return nativeValidity;
    }
  }

  validate(report: boolean) {
    if (report) {
      return this.materialTextArea.reportValidity() as boolean
    } else {
      return this.materialTextArea.checkValidity() as boolean
    }
  }

  invalid() {
    let validityState: ValidityState = this.materialTextArea.validity
    for (let key in validityState) {
      if (!validityState[key]) {
        delete validityState[key]
      }
    }
    let validityMessage = this.materialTextArea.validationMessage
    let customError = false
    if (validityState['validityMessage']) {
      validityMessage = validityState['validityMessage']
      delete validityState['validityMessage']
      customError = true
    }
    this.errors[this.definition.name] = new InvalidError(validityMessage, customError, validityState)
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("material").registerComponent("text", {
  importPath: "@formsey/fields-material/TextField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-text-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-text-material>`
  }
})