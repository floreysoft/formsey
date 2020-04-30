import { CheckboxesFieldDefinition, Option, ChangeEvent } from '@formsey/core';
import "@material/mwc-formfield/mwc-formfield";
import "@material/mwc-radio/mwc-radio";
import { Radio } from "@material/mwc-radio/mwc-radio";
import "@material/mwc-textfield/mwc-textfield";
import { TextField } from "@material/mwc-textfield/mwc-textfield";
import { css, customElement, html, property, query, queryAll, TemplateResult } from 'lit-element';
import { MaterialField } from './MaterialField';

@customElement("formsey-multiple-choice-material")
export class MultipleChoiceField extends MaterialField<CheckboxesFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("mwc-textfield")
  otherTextField: TextField

  @queryAll("mwc-radio")
  protected radios: Radio[]

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
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i] as Option
        let label = option.label ? option.label : option.value;
        let value = option.value ? option.value : option.label;
        let checked = this.value == value
        templates.push(html`<mwc-formfield label="${label}"><mwc-radio .checked="${checked}" value="${value}" @change="${this.changed}"></mwc-radio></mwc-formfield>`);
      }
    }
    if (this.definition.other) {
      let checked = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label)).length == 0
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-radio .checked="${checked}" value="__other" @change="${this.changed}"></mwc-radio></mwc-formfield><mwc-textfield @input="${this.otherChanged}" ?disabled="${this.definition.disabled || !checked}" .value=""></mwc-textfield></div>`);
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`${templates}`;
  }

  otherChanged(e: Event) {
    this.value = (<TextField>e.target).value
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
  }

  changed(e: Event) {
    let value = (<Radio>e.target).value
    let other = false
    if (value == "__other") {
      other = true
      this.value = (this.otherTextField.value)
    } else {
      this.value = value
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
    }
    if ( value == "__other" && other) {
      this.updateComplete.then(() => {
        this.otherTextField.focus()
      })
    }
  }
}