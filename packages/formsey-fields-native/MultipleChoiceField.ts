import { CheckboxesFieldDefinition, createField, LabeledField, register, StringFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { html, property, query, TemplateResult, queryAll } from 'lit-element';
import { StringField } from './StringField';

export class MultipleChoiceField extends LabeledField<CheckboxesFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("formsey-string")
  otherTextField: StringField

  @queryAll("input[type=radio]")
  protected radios: HTMLInputElement[]

  renderField() {
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i]
        let label = option.label ? option.label : option.value;
        let value = option.value ? option.value : option.label;
        let checked = this.value == value
        templates.push(html`<div><label><input type="radio" .checked="${checked}" name="${this.path()}" value="${value}" @change="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}">${label}</label></div>`);
      }
    }
    if (this.definition.other) {
      let checked = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label)).length == 0
      templates.push(html`<div class="other"><label><input type="radio" .checked="${checked}" name="${this.path()}" value="__other" @change="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}">Other</label>${createField(this.components, { type: "string", "name": "other", disabled: this.definition.disabled || !checked } as StringFieldDefinition, checked ? this.value : "", this.path(), null, (e) => this.otherChanged(e), null)}</div>`);
    }
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<div class="options">${templates}</div>`;
  }

  otherChanged(e: ValueChangedEvent<string>) {
    this.value = e.detail.value
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change", this.path(), this.value));
    }
  }

  focusField() {
    if (this.radios) {
      this.radios[0].focus()
      return true
    }
    return false
  }

  changed(e: Event) {
    e.stopPropagation();
    let value = (<HTMLInputElement>e.target).value
    let other = false
    if (value == "__other") {
      other = true
      this.otherTextField.definition.disabled = false
      this.value = (this.otherTextField.value)
      this.otherTextField.requestUpdate()
      this.otherTextField.updateComplete.then(() => {
        this.otherTextField.focusField()
      })
    } else {
      this.value = value
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
      this.otherTextField.definition.disabled = true
      this.otherTextField.requestUpdate()
    }
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }
}
register("formsey-multiple-choice", MultipleChoiceField, "native", "multipleChoice", { importPath: "@formsey/fields-native/MultipleChoiceField"})