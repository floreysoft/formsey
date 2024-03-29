import { CheckboxesFieldDefinition, Option } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox";
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { css, html, TemplateResult } from "lit";
import { customElement, query, queryAll } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { MaterialField } from './MaterialField';

@customElement("formsey-checkboxes-material")
export class CheckboxesField extends MaterialField<CheckboxesFieldDefinition, string[]> {
  @query("mwc-textfield")
  otherTextField: TextField | undefined

  @queryAll("mwc-checkbox")
  protected checkboxes: Checkbox[] | undefined

  static get styles() {
    return [css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .other {
      display: grid;
      grid-template-columns: max-content minmax(10em,20em);
      grid-gap: 2em;
      align-items: center;
    }`]
  }

  renderField() {
    if (!this.definition) return
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
        templates.push(html`<mwc-formfield label="${label}"><mwc-checkbox .checked="${checked}" value="${value}" @change="${this.changed}"></mwc-checkbox></mwc-formfield>`);
      }
    }
    if (this.definition.other) {
      let checked = this.value.filter(value => this.definition!.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-checkbox .checked="${checked}" value="__other" @change="${this.changed}"></mwc-checkbox></mwc-formfield><mwc-textfield @input="${this.changed}" ?disabled="${this.definition.disabled || !checked}"></mwc-textfield></div>`);
    }
    return html`${templates}`;
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.checkboxes?.[0].focus()
    }
  }

  changed(e: Event) {
    let values = []
    let other = false
    for (let value of this.values()) {
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
    if (this.definition!.name) {
      this.dispatchEvent(new FieldChangeEvent(this.definition!.name, this.value));
    }
    if ((<Checkbox>e.target).value == "__other" && other) {
      this.updateComplete.then(() => {
        this.otherTextField!.focus()
      })
    }
  }

  private values(): string[] {
    let values: string[] = []
    this.checkboxes?.forEach(checkbox => {
      if (checkbox.checked) {
        values.push(checkbox.value)
      }
    })
    return values;
  }
}

getLibrary("material").registerComponent("checkboxes", {
  importPath: "@formsey/fields-material/CheckboxesField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string[]>) => {
    return html`<formsey-checkboxes-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @invalid=${invalidHandler}></formsey-checkboxes-material>`
  }
})