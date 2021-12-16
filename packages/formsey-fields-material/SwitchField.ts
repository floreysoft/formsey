import { FieldChangeEvent } from '@formsey/core';
import { SwitchFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-formfield/mwc-formfield";
import "@material/mwc-switch/mwc-switch";
import { Switch } from "@material/mwc-switch/mwc-switch";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { MaterialField } from './MaterialField';


@customElement("formsey-switch-material")
export class SwitchField extends MaterialField<SwitchFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean | undefined

  @query("mwc-switch")
  materialSwitch: Switch | undefined

  renderField() {
    if (!this.definition) return
    return html`<mwc-formfield label="${this.definition.controlLabel || ''}"><mwc-switch @input="${(event: Event) => this.changed(event)}" @change="${(event: Event) => this.changed(event)}" ?disabled="${this.definition.disabled}" ?checked="${this.value}"></mwc-switch></mwc-formfield>`;
  }

  focusField(path: string) {
    this.materialSwitch?.focus()
    return true
  }

  public validate(report: boolean) {
    let valid = !this.definition?.required || this.materialSwitch!.selected
    if (!valid) {
      let errors: InvalidErrors = new InvalidErrors()
      errors.set(this.path(), {
        "validityMessage": this.definition!.customValidity ? this.definition!.customValidity : "Please check this box if you want to proceed", "validityState": {
          "valueMissing": true
        }
      })
      this.dispatchEvent(new InvalidEvent(errors))
    }
    return valid
  }

  protected changed(e: Event) {
    e.stopPropagation()
    this.value = this.materialSwitch!.selected
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }
}

getLibrary("material").registerComponent("switch", {
  importPath: "@formsey/fields-material/SwitchField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<SwitchFieldDefinition, boolean>) => {
    return html`<formsey-switch-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-switch-material>`
  }
})