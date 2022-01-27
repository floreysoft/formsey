import { CheckboxesFieldDefinition, CheckboxFieldDefinition, createField, LabeledField, StringFieldDefinition } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/Events';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html, TemplateResult } from "lit";
import { customElement, query, queryAll } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { CheckboxField } from './CheckboxField';
import { StringField } from './StringField';
import { createComparator } from '@formsey/fields-native';


@customElement("formsey-checkboxes")
export class CheckboxesField extends LabeledField<CheckboxesFieldDefinition, string[]> {
  @query("formsey-string")
  otherTextField: StringField | undefined

  @queryAll("formsey-checkbox")
  protected checkboxes: CheckboxField[] | undefined

  renderField() {
    if (!this.value) {
      this.value = []
    }
    let templates: (TemplateResult | undefined)[] = [];
    if (this.definition?.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i]
        let label = option.label || option.value;
        let value = option.value || option.label;
        let checked = this.value.includes(value);
        templates.push(createField({ library: this.library, context: this.context, definition: { type: "checkbox", name: value, controlLabel: label } as CheckboxFieldDefinition, value: checked, parentPath: this.path(), changeHandler: this.changed }));
      }
    }
    if (this.definition?.other) {
      let other = this.value.filter(value => this.definition?.options.filter(option => value == (option.value ? option.value : option.label)).length == 0)
      let checked = other.length > 0
      templates.push(html`<div class="other">${createField({ library: this.library, context: this.context, definition: { type: "checkbox", name: "__other", controlLabel: "Other" } as CheckboxFieldDefinition, value: checked, parentPath: this.path(), changeHandler: this.changed })}${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "string", "name": "other", disabled: this.definition.disabled || !checked } as StringFieldDefinition, value: checked ? other[0] : "", parentPath: this.path(), changeHandler: this.changed })}</div>`);
    }
    return html`<div class=${this.definition?.layout == "horizontal" ? "options horizontal" : "options vertical"}>${templates}</div>`;
  }

  otherChanged(e: FieldChangeEvent<string[]>) {
    const isSame = createComparator(this.value)
    this.value = e.detail.value
    this.requestUpdate()
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
  }

  focusField() {
    this.checkboxes?.[0].focus()
    return true
  }

  changed(e: Event) {
    e.stopPropagation();
    const isSame = createComparator(this.value)
    let values = []
    let other = false
    for (let value of this.values()) {
      if (value == "__other" && this.otherTextField?.definition) {
        other = true
        this.otherTextField.definition.disabled = false
        values.push(this.otherTextField.value)
        this.otherTextField.requestUpdate()
        this.otherTextField.updateComplete.then(() => {
          this.otherTextField?.focusField()
        })
      } else {
        values.push(value)
      }
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.value = values
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
  }

  private values(): string[] {
    let values: string[] = []
    this.checkboxes?.forEach(checkbox => {
      if (checkbox.definition?.name && checkbox.value) {
        values.push(checkbox.definition.name)
      }
    })
    return values;
  }
}

getLibrary("native").registerComponent("checkboxes", {
  importPath: "@formsey/fields-native/CheckboxesField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string[]>) => {
    return html`<formsey-checkboxes id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @invalid=${invalidHandler}></formsey-checkboxes>`
  }
})