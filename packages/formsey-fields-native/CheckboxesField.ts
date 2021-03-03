import { CheckboxesFieldDefinition, createField, LabeledField, StringFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html, TemplateResult } from "lit";
import { customElement, query, queryAll } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { StringField } from './StringField';


@customElement("formsey-checkboxes")
export class CheckboxesField extends LabeledField<CheckboxesFieldDefinition, string[]> {
  @query("formsey-string")
  otherTextField: StringField

  @queryAll("input[type=checkbox]")
  protected checkboxes: HTMLInputElement[]

  renderField() {
    if (!this.value) {
      this.value = []
    }
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i]
        let label = option.label || option.value;
        let value = option.value || option.label;
        let checked = this.value.includes(value);
        templates.push(html`<div><label><input type="checkbox" .checked="${checked}" value="${value}" @change="${this.changed}" @input="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}">${label}</label></div>`);
      }
    }
    if (this.definition.other) {
      let other = this.value.filter(value => this.definition.options.filter(option => value == (option.value ? option.value : option.label)).length == 0)
      let checked = other.length > 0
      templates.push(html`<div class="other"><label><input type="checkbox" .checked="${checked}" name="${this.definition.name}" value="__other" @change="${this.changed}" @input="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}">Other</label>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "string", "name": "other", disabled: this.definition.disabled || !checked } as StringFieldDefinition, value: checked ? other[0] : "", parentPath: this.path(), changeHandler: (e) => this.changed(e) })}</div>`);
    }
    return html`<div class=${this.definition.layout == "horizontal" ? "options horizontal" : "options vertical"}>${templates}</div>`;
  }

  otherChanged(e: ValueChangedEvent<string>) {
    this.value = e.detail.value
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change", this.path(), this.value));
  }

  focusField() {
    this.checkboxes[0].focus()
    return true
  }

  changed(e: Event) {
    e.stopPropagation();
    let values = []
    let other = false
    for (let value of this.values()) {
      if (value == "__other") {
        other = true
        this.otherTextField.definition.disabled = false
        values.push(this.otherTextField.value)
        this.otherTextField.requestUpdate()
        this.otherTextField.updateComplete.then(() => {
          this.otherTextField.focusField()
        })
      } else {
        values.push(value)
      }
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.value = values
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change", this.path(), this.value));
  }

  private values(): string[] {
    let values = []
    this.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        values.push(checkbox.value)
      }
    })
    return values;
  }
}

getLibrary("native").registerComponent("checkboxes", {
  importPath: "@formsey/fields-native/CheckboxesField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string[]>) => {
    return html`<formsey-checkboxes id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkboxes>`
  }
})