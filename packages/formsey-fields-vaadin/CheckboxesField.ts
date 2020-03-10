import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { CheckboxesFieldDefinition, Option, ValueChangedEvent } from '@formsey/core';
import { CheckboxGroupElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { VaadinTextField } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { VaadinField } from './VaadinField';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';


@customElement("formsey-checkboxes-vaadin")
export class CheckboxesField extends VaadinField<CheckboxesFieldDefinition, string[]> {
  @property({ converter: Object })
  value: string[] = []

  @query("vaadin-checkbox-group")
  private vaadinCheckboxGroup: CheckboxGroupElement;

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
    #other {
      margin-top: 0.4em;
      display: flex;
      flex-direction: row;
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
        templates.push(html`<vaadin-checkbox .checked="${checked}" value="${value}">${label}</vaadin-checkbox>`);
      }
    }
    if (this.definition.other) {
      let checked = this.value.filter(value => this.definition.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
      templates.push(html`<vaadin-checkbox .checked="${checked}" id="other" value="__other">Other</vaadin-checkbox><vaadin-text-field @input="${this.valueChanged}" ?disabled="${this.definition.disabled || !checked}" .value=""></vaadin-text-field>`);
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-checkbox-group @change="${this.valueChanged}" label="${this.definition.prompt}" theme="vertical" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-checkbox-group>`;
  }

  valueChanged(e: Event) {
    let values = []
    let other = false
    for (let value of this.vaadinCheckboxGroup.value) {
      if (value == "__other") {
        other = true
        values.push(this.otherTextField.value)
      } else {
        values.push(value)
      }
    }
    if (!other) {
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

  validate(report: boolean) {
    this.valid = this.vaadinCheckboxGroup.validate() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinCheckboxGroup.errorMessage, false, { ...this.vaadinCheckboxGroup.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}