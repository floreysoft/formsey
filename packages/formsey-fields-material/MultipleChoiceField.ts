import { CheckboxesFieldDefinition, Option, register, ValueChangedEvent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import "@material/mwc-formfield/mwc-formfield";
import "@material/mwc-radio/mwc-radio";
import { Radio } from "@material/mwc-radio/mwc-radio";
import "@material/mwc-textfield/mwc-textfield";
import { TextField } from "@material/mwc-textfield/mwc-textfield";
import { css, html, TemplateResult } from "lit-element";
import { property, query, queryAll } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { MaterialField } from './MaterialField';

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
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-radio .checked="${checked}" value="__other" @change="${this.changed}"></mwc-radio></mwc-formfield><mwc-textfield @input="${this.otherChanged}" ?disabled="${this.definition.disabled || !checked}"></mwc-textfield></div>`);
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
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
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
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
    }
    if ( value == "__other" && other) {
      this.updateComplete.then(() => {
        this.otherTextField.focus()
      })
    }
  }
}

register({
  type: "multipleChoice",
  tag: "formsey-multiple-choice-material",
  constructor: MultipleChoiceField,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/MultipleChoiceField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-multiple-choice-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-multiple-choice-material>`
  }
})