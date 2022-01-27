import { CheckboxesFieldDefinition, createField, LabeledField, StringFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/Events';
import { html, TemplateResult } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { StringField } from './StringField';
import { FieldInputEvent } from '@formsey/core/Events';
import { createComparator } from '@formsey/fields-native';


@customElement("formsey-multiple-choice")
export class MultipleChoiceField extends LabeledField<CheckboxesFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("formsey-string")
  otherTextField: StringField | undefined

  @queryAll("input[type=radio]")
  protected radios: HTMLInputElement[] | undefined

  renderField() {
    if (this.definition) {
      let templates: TemplateResult[] = [];
      if (this.definition.options) {
        for (let i = 0; i < this.definition.options.length; i++) {
          let option = this.definition.options[i]
          let label = option.label ? option.label : option.value;
          let value = option.value ? option.value : option.label;
          let checked = this.value == value
          templates.push(html`<div><label><input class="hid" type="radio" .checked="${checked}" name="${this.path()}" value="${value}" @change="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}"><span class="rb"><span class="r"></span></span><span class="rl">${label}</span></label></div>`);
        }
      }
      if (this.definition.other) {
        let checked = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label)).length == 0
        templates.push(html`<div class="other"><label><input class="hid" type="radio" .checked="${checked}" name="${this.path()}" value="__other" @change="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}"><span class="rb"><span class="r"></span></span><span class="rl">Other</span></label>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "string", "name": "other", disabled: this.definition.disabled || !checked } as StringFieldDefinition, value: checked ? this.value : "", parentPath: this.path(), changeHandler: this.otherChanged })}</div>`);
      }
      return html`<div class=${this.definition.layout == "horizontal" ? "options horizontal" : "options vertical"}>${templates}</div>`;
    }
  }

  otherChanged(e: FieldChangeEvent<string>) {
    const isSame = createComparator(this.value)
    this.value = e.detail.value
    this.requestUpdate()
    if (this.definition?.name) {
      this.dispatchEvent(new FieldInputEvent(this.path(), this.value, !isSame(this.value)));
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
    const isSame = createComparator(this.value)
    let value = (<HTMLInputElement>e.target).value
    let other = false
    if (this.otherTextField?.definition) {
      if (value == "__other") {
        other = true
        this.otherTextField.definition.disabled = false
        this.value = (this.otherTextField.value)
        this.otherTextField.requestUpdate()
        this.otherTextField.updateComplete.then(() => {
          this.otherTextField?.focusField()
        })
      } else {
        this.value = value
      }
      if (!other && this.otherTextField) {
        this.otherTextField.value = ""
        this.otherTextField.definition.disabled = true
        this.otherTextField.requestUpdate()
      }
    } else {
      this.value = value
    }
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
  }
}

getLibrary("native").registerComponent("multipleChoice", {
  importPath: "@formsey/fields-native/MultipleChoiceField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string>) => {
    return html`<formsey-multiple-choice id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${<string>value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-multiple-choice>`
  }
})