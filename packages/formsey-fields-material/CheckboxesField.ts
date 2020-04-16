import { CheckboxesFieldDefinition, Field, Option, ValueChangedEvent } from '@formsey/core';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@material/mwc-textfield/mwc-textfield.js";
import { TextField } from "@material/mwc-textfield/mwc-textfield.js";
import { Checkbox } from "@material/mwc-checkbox/mwc-checkbox";
import { css, customElement, html, property, query, TemplateResult, queryAll } from 'lit-element';

@customElement("formsey-checkboxes-material")
export class CheckboxesField extends Field<CheckboxesFieldDefinition, string[]> {
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
      font-family: var(--lumo-font-family);
    }
    .other {
      display: grid;
      grid-template-columns: max-content minmax(100px,350px);
      grid-gap: 10px;
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
        templates.push(html`<mwc-formfield label="${label}"><mwc-checkbox .checked="${checked}" value="${value}" @change="${this.valueChanged}"></mwc-checkbox></mwc-formfield>`);
      }
    }
    if (this.definition.other) {
      let checked = this.value.filter(value => this.definition.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-checkbox .checked="${checked}" value="__other" @change="${this.valueChanged}"></mwc-checkbox></mwc-formfield><mwc-textfield @input="${this.valueChanged}" ?disabled="${this.definition.disabled || !checked}" .value=""></mwc-textfield></div>`);
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    console.log(customValidity)
    return html`${templates}`;
  }

  valueChanged(e: Event) {
    let values = []
    let other = false
    for (let value of this.combinedValues()) {
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
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
    if (other) {
      this.updateComplete.then(() => {
        this.otherTextField.focus()
      })
    }
  }

  private combinedValues() : string[] {
    let values = []
    this.checkboxes.forEach(checkbox => {
      if ( checkbox.checked ) {
        values.push(checkbox.value)
      }
    })
    console.log(values)
    return values;
  }
}