import { CheckboxesFieldDefinition, createField, LabeledField, StringFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query, queryAll, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

@customElement("formsey-multiple-choice")
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
      templates.push(html`<div class="other"><label><input type="radio" .checked="${checked}" name="${this.path()}" value="__other" @change="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}">Other</label>${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "string", "name": "other", disabled: this.definition.disabled || !checked } as StringFieldDefinition, value: checked ? this.value : "", parentPath: this.path(), changeHandler: (e) => this.otherChanged(e)})}</div>`);
    }
    return html`<div class=${this.definition.layout == "horizontal" ? "options horizontal" : "options vertical"}>${templates}</div>`;
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

getLibrary("native").registerComponent("multipleChoice", {
  importPath: "@formsey/fields-native/MultipleChoiceField",
    template: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<CheckboxesFieldDefinition, string> ) => {
    return html`<formsey-multiple-choice id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${<string>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-multiple-choice>`
  }
})