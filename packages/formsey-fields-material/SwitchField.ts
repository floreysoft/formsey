import { ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { SwitchFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-formfield/mwc-formfield";
import "@material/mwc-switch/mwc-switch";
import { Switch } from "@material/mwc-switch/mwc-switch";
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { MaterialField } from './MaterialField';

@customElement("formsey-switch-material")
export class SwitchField extends MaterialField<SwitchFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("mwc-switch")
  materialSwitch: Switch

  renderField() {
    return html`<mwc-formfield label="${this.definition.controlLabel || ''}"><mwc-switch @input="${(event) => this.changed(event)}" @change="${(event) => this.changed(event)}" ?disabled="${this.definition.disabled}" ?checked="${this.value}"></mwc-switch></mwc-formfield>`;
  }

  focusField(path: string) {
    this.materialSwitch.focus()
    return true
  }

  public validate(report: boolean) {
    let valid = !this.definition.required || this.materialSwitch.checked
    if (!valid) {
      let errors: InvalidErrors = new InvalidErrors()
      errors.set(this.path(), {
        "validityMessage": this.definition.customValidity ? this.definition.customValidity : "Please check this box if you want to proceed", "validityState": {
          "valueMissing": true
        }
      })
      this.dispatchEvent(new InvalidEvent(errors))
    }
    return valid
  }

  protected changed(e: Event) {
    e.stopPropagation()
    this.value = this.materialSwitch.checked
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
  }
}

getLibrary("material").registerComponent("switch", {
  importPath: "@formsey/fields-material/SwitchField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<SwitchFieldDefinition, boolean>) => {
    return html`<formsey-switch-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-switch-material>`
  }
})