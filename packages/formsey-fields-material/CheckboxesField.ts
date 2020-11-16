import { CheckboxesFieldDefinition, Option, ValueChangedEvent } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox";
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { css, customElement, html, property, query, queryAll, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { MaterialField } from './MaterialField';

@customElement("formsey-checkboxes-material")
export class CheckboxesField extends MaterialField<CheckboxesFieldDefinition, string[]> {
  @property({ converter: Object })
  value: string[] = []

  @query("mwc-textfield")
  otherTextField: TextField

  @queryAll("mwc-checkbox")
  protected checkboxes: Checkbox[]

  static get styles() {
    return [...super.styles, css`
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
      let checked = this.value.filter(value => this.definition.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-checkbox .checked="${checked}" value="__other" @change="${this.changed}"></mwc-checkbox></mwc-formfield><mwc-textfield @input="${this.changed}" ?disabled="${this.definition.disabled || !checked}"></mwc-textfield></div>`);
    }
    return html`${templates}`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.checkboxes[0].focus()
    }
  }

  changed(e: Event) {
    let values = []
    let other = false
    for (let value of this.values()) {
      if (value == "__other") {
        other = true
        values.push(this.otherTextField.value)
      } else {
        values.push(value)
      }
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.value = values
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
    }
    if ((<Checkbox>e.target).value == "__other" && other) {
      this.updateComplete.then(() => {
        this.otherTextField.focus()
      })
    }
  }

  private values() : string[] {
    let values = []
    this.checkboxes.forEach(checkbox => {
      if ( checkbox.checked ) {
        values.push(checkbox.value)
      }
    })
    return values;
  }
}

getLibrary("material").registerComponent("checkboxes", {
  importPath: "@formsey/fields-material/CheckboxesField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string[], parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-checkboxes-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkboxes-material>`
  }
})