import { CheckboxesFieldDefinition, LabeledField, Option, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { TextfieldElement } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

class CheckboxesValue {
  other: string
  values: Object;

  constructor() {
    this.values = {};
  }
}

@customElement("formsey-checkboxes-vaadin")
export class CheckboxesField extends LabeledField<CheckboxesFieldDefinition, CheckboxesValue> {
  private static readonly other: string = "other";

  @property({ converter: Object })
  value: CheckboxesValue;

  static get styles() {
    return [...super.styles, css`:host {
      display: flex;
      flex-direction: column;
      font-family: var(--lumo-font-family);
     }
     .fs-other {
      display: flex;
      flex-direction: row;
      align-items: center;
     }`]
  }

  renderField() {
    if (!this.value) {
      this.value = new CheckboxesValue();
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i];
        if (typeof option === "string") {
          templates.push(html`<vaadin-checkbox @change="${(event) => this.optionChanged(event, <string>option)}" .checked="${this.value.values[<string>option]}">${option}</vaadin-checkbox>`);
        } else {
          templates.push(html`<vaadin-checkbox @change="${(event) => this.optionChanged(event, ((<Option>option).value ? (<Option>option).value : (<Option>option).label))}" .checked="${ifDefined(this.value ? this.value.values[((<Option>option).value ? (<Option>option).value : (<Option>option).label)] : this.value)}">${(<Option>option).label ? (<Option>option).label : (<Option>option).value}</vaadin-checkbox>`);
        }
      }
    }
    if (this.definition.other) {
      templates.push(html`<div class="fs-other"><vaadin-checkbox @change="${(event) => this.optionChanged(event, CheckboxesField.other)}" .checked="${ifDefined(this.value ? this.value.values[CheckboxesField.other] : this.value)}">Other</vaadin-checkbox><vaadin-text-field style="display:inline-flex;width:100%" @change="${this.otherChanged}" @keyup="${this.otherChanged}" ?disabled="${ifDefined(this.value ? !this.value.values[CheckboxesField.other] : this.value)}" .value="${ifDefined(this.value ? this.value.other : this.value)}"></vaadin-text-field></div>`);
    }
    return html`${templates}`;
  }

  protected otherChanged(e: any) {
    this.value.other = e.currentTarget.value;
    this.value.values[CheckboxesField.other] = this.value.other.length > 0;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
    this.requestUpdate();
  }

  protected async optionChanged(e: any, option: string) {
    this.value.values[option] = e.currentTarget.checked;
    if (option === CheckboxesField.other) {
      if (!e.currentTarget.checked) {
        this.value.other = ""
      }
      this.requestUpdate();
      await this.updateComplete;
      if (this.shadowRoot) {
        let textfield: TextfieldElement = this.shadowRoot.querySelector("vaadin-text-field");
        textfield.focus();
      }
    }
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}