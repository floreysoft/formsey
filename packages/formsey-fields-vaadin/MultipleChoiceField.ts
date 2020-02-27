import { CheckboxesFieldDefinition, LabeledField, Option, ValueChangedEvent } from '@formsey/core';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { TextfieldElement } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, TemplateResult } from 'lit-element';

class MultipleChoiceValue {
  other: string
  option: string;
}

@customElement("formsey-multiple-choice-vaadin")
export class MultipleChoiceField extends LabeledField<CheckboxesFieldDefinition, MultipleChoiceValue> {
  private static readonly other: string = "other";

  @property({ converter: Object })
  value: MultipleChoiceValue;

  static get styles() {
    return [...super.styles, css`
    :host {
      width: 100%;
    }
    vaadin-radio-group {
      width: 100%;
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
      templates.push(html`<vaadin-radio-button class="fs-other" value="${MultipleChoiceField.other}" .checked="${this.value.option === MultipleChoiceField.other}">Other</radio-button><vaadin-text-field @change="${this.otherChanged}" @keyup="${this.otherChanged}" ?disabled="${!(this.value.option === MultipleChoiceField.other)}" .value="${this.value.other}"></vaadin-text-field>`);
    }
    return html`<vaadin-radio-group @value-changed="${this.valueChanged}" theme="vertical">${templates}</vaadin-radio-group>`;
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
}
