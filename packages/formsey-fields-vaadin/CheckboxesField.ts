import { Field } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/Events';
import { CheckboxesFieldDefinition, Option } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { Checkbox } from '@vaadin/checkbox';
import { CheckboxGroup } from '@vaadin/checkbox-group';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { TextField } from '@vaadin/text-field';
import { css, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-checkboxes-vaadin")
export class CheckboxesField extends Field<CheckboxesFieldDefinition, string[]> {
  @property({ converter: Object })
  value: string[] = []

  @query("vaadin-checkbox-group")
  private vaadinCheckboxGroup: CheckboxGroup | undefined

  @query("vaadin-text-field")
  otherTextField: TextField | undefined

  static get styles() {
    return [css`
    :host {
      display: flex;
      flex-direction: column;
      font-family: var(--lumo-font-family);
    }
    vaadin-text-field {
      position: relative;
      top: -2.4em;
      margin-bottom: -2.4em;
      left: 5em;
      flex-grow: 1;
    }
    .other {
      margin-top: 0.4em;
      display: flex;
      flex-direction: row;
      align-items: center;
    }`]
  }

  render() {
    if (this.definition) {
      if (!this.value) {
        this.value = []
      }
      let templates: TemplateResult[] = [];
      if (this.definition.options) {
        for (let i = 0; i < this.definition.options.length; i++) {
          let option = this.definition.options[i] as Option
          let label = option.label ? option.label : option.value;
          let value = option.value ? option.value : option.label;
          let checked = this.value.includes(value);
          templates.push(html`<vaadin-checkbox .checked="${checked}" value="${value}">${label}</vaadin-checkbox>`);
        }
      }
      if (this.definition.other) {
        let checked = this.value.filter(value => this.definition?.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
        templates.push(html`<vaadin-checkbox .checked="${checked}" class="other" value="__other">Other</vaadin-checkbox><vaadin-text-field @input="${this.changed}" ?disabled="${this.definition.disabled || !checked}"></vaadin-text-field>`);
      }
      let customValidity = this.errors?.get(this.path())?.validityMessage || this.definition.customValidity
      return html`<vaadin-checkbox-group @change="${this.changed}" label="${ifDefined(this.definition.label)}" .helperText="${typeof this.definition.helpText == "string" ? this.definition.helpText : ""}" theme="${this.definition.layout == "horizontal" ? "horizontal" : "vertical"}" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-checkbox-group>`;
    }
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.vaadinCheckboxGroup?.focus()
    }
  }

  changed(e: Event) {
    let values = []
    let other = false
    for (let value of this.vaadinCheckboxGroup!.value) {
      if (value == "__other") {
        other = true
        values.push(this.otherTextField!.value)
      } else {
        values.push(value)
      }
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.value = values
    this.requestUpdate()
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    if (other) {
      this.updateComplete.then(() => {
        this.otherTextField?.focus()
      })
    }
  }

  validate(report: boolean) {
    this.valid = this.vaadinCheckboxGroup?.validate() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors = this.errors || new InvalidErrors()
    if (this.definition?.name) {
      this.errors.set(this.definition.name, new InvalidError(this.vaadinCheckboxGroup?.errorMessage || "", false, {}))
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }
}

getLibrary("vaadin").registerComponent("checkboxes", {
  importPath: "@formsey/fields-vaadin/CheckboxesField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string[]>) => {
    return html`<formsey-checkboxes-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-checkboxes-vaadin>`
  }
})