import { CheckboxFieldDefinition, FieldChangeEvent } from '@formsey/core';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-checkbox/mwc-checkbox.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { MaterialField } from './MaterialField';


@customElement("formsey-checkbox-material")
export class CheckboxField extends MaterialField<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean | undefined

  @query("mwc-checkbox")
  materialCheckbox: Checkbox | undefined

  renderField() {
    if (!this.definition) return
    return html`<mwc-formfield label="${ifDefined(this.definition.controlLabel)}"><mwc-checkbox @change="${(event: Event) => this.changed(event)}" .indeterminate="${!!this.definition.indeterminate}" ?disabled="${this.definition.disabled}" ?checked="${this.value}"></mwc-checkbox></mwc-formfield>`;
  }

  focusField(path: string) {
    this.materialCheckbox?.focus()
    return true
  }

  public validate(report: boolean) {
    let valid = !this.definition!.required || this.materialCheckbox!.checked
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

  protected changed(e: any) {
    this.value = this.materialCheckbox!.checked
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }
}

getLibrary("material").registerComponent("checkbox", {
  importPath: "@formsey/fields-material/CheckboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-checkbox-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-checkbox-material>`
  }
})