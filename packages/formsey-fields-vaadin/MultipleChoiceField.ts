import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { CheckboxesFieldDefinition, Option, ValueChangedEvent } from '@formsey/core';
import { RadioGroupElement } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { VaadinField } from './VaadinField';
import { TextfieldElement } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, TemplateResult, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';

class MultipleChoiceValue {
  other: string
  option: string;
}

@customElement("formsey-multiple-choice-vaadin")
export class MultipleChoiceField extends VaadinField<CheckboxesFieldDefinition, MultipleChoiceValue> {
  private static readonly other: string = "other";

  @property({ converter: Object })
  value: MultipleChoiceValue;

  @query("vaadin-radio-group")
  private vaadinRadioGroup: RadioGroupElement;

  static get styles() {
    return [...super.styles, css`
    :host {
      width: 100%;
    }
    vaadin-radio-group {
      width: 100%;
    }
    vaadin-text-field {
      position: relative;
      top: -2.2em;
      margin-bottom: -2.2em;
      left: 5em;
      flex-grow: 1;
      width: calc(100% - 5em);
    }
    .fs-other {
      display: flex;
      flex-direction: row;
      align-items: center;
    }`]
  }

  renderField() {
    if (!this.value) {
      this.value = new MultipleChoiceValue();
      if (this.definition.default) {
        if (typeof this.definition.default === "string") {
          this.value.option = <string>this.definition.default;
        } else {
          this.value = this.definition.default;
        }
      }
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    let templates: TemplateResult[] = [];
    for (let i = 0; i < this.definition.options.length; i++) {
      let option = this.definition.options[i];
      if (typeof option === "string") {
        templates.push(html`<vaadin-radio-button value="${<string>option}" .checked="${this.value.option === <string>option}">${option}</vaadin-radio-button>`);
      } else {
        let checked = this.value.option === ((<Option>option).value ? (<Option>option).value : (<Option>option).label);
        templates.push(html`<vaadin-radio-button value="${(<Option>option).value ? (<Option>option).value : (<Option>option).label}" .checked="${checked}">${(<Option>option).label ? (<Option>option).label : (<Option>option).value}</vaadin-radio-button>`);
      }
    }
    if (this.definition.other) {
      templates.push(html`<vaadin-radio-button class="fs-other" value="${MultipleChoiceField.other}" .checked="${this.value.option === MultipleChoiceField.other}">Other</vaadin-radio-button>
      <vaadin-text-field @change="${this.otherChanged}" @keyup="${this.otherChanged}" ?disabled="${this.definition.disabled || !(this.value.option === MultipleChoiceField.other)}" .value="${this.value.other}"></vaadin-text-field>`);
    }
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-radio-group @value-changed="${this.valueChanged}" label="${this.definition.prompt}" theme="vertical" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-radio-group>`;
  }

  protected otherChanged(e: any) {
    this.value.other = e.currentTarget.value;
    if ( this.definition.name ) {
       this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  protected async valueChanged(e: any) {
    this.value.option = e.detail.value;
    if (this.value.option === MultipleChoiceField.other) {
      await this.updateComplete;
      if (this.shadowRoot) {
        let textfield: TextfieldElement = this.shadowRoot.querySelector("vaadin-text-field");
        textfield.focus();
      }
    } else {
      this.value.other = "";
    }
    this.requestUpdate();
    if ( this.definition.name ) {
       this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
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
