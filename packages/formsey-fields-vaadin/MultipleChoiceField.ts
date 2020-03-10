import { CheckboxesFieldDefinition, Option, ValueChangedEvent } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { RadioGroupElement } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { VaadinTextField } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

@customElement("formsey-multiple-choice-vaadin")
export class MultipleChoiceField extends VaadinField<CheckboxesFieldDefinition, String> {
  @property({ type: String })
  value: string;

  @query("vaadin-radio-group")
  private vaadinRadioGroup: RadioGroupElement;

  @query("vaadin-text-field")
  otherTextField: VaadinTextField

  static get styles() {
    return [...super.styles, css`
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

  renderField() {
    let templates: TemplateResult[] = [];
    for (let i = 0; i < this.definition.options.length; i++) {
      let option = this.definition.options[i] as Option
      let label = option.label ? option.label : option.value;
      let value = option.value ? option.value : option.label;
      let checked = value == this.value;
      templates.push(html`<vaadin-radio-button value="${value}" .checked="${checked}">${label}</vaadin-radio-button>`);
    }
    if (this.definition.other) {
      let filtered = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label))
      let checked = (typeof this.value != "undefined") && (filtered.length == 0)
      templates.push(html`<vaadin-radio-button class="other" value="__other" .checked="${checked}">Other</vaadin-radio-button>
      <vaadin-text-field @input="${this.valueChanged}" ?disabled="${this.definition.disabled || !checked}" .value="${checked ? this.value : ""}"></vaadin-text-field>`);
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-radio-group @value-changed="${this.valueChanged}" label="${this.definition.prompt}" theme="vertical" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-radio-group>`;
  }

  valueChanged(e: Event) {
    this.value = this.vaadinRadioGroup.value
    let other = false
    if (this.value == "__other") {
      other = true
      this.value = this.otherTextField.value
    }
    if (!other) {
      this.otherTextField.value = ""
    }
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
    if (other) {
      this.updateComplete.then(() => {
        let that = this
        setTimeout(
          function () { that.otherTextField.focus() }, 100);
      })
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinRadioGroup.validate() : this.vaadinRadioGroup.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinRadioGroup.errorMessage, false, { ...this.vaadinRadioGroup.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}
