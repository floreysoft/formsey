import { CheckboxesFieldDefinition, FieldChangeEvent, Option } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@material/mwc-formfield/mwc-formfield";
import "@material/mwc-radio/mwc-radio";
import { Radio } from "@material/mwc-radio/mwc-radio";
import "@material/mwc-textfield/mwc-textfield";
import { TextField } from "@material/mwc-textfield/mwc-textfield";
import { html, TemplateResult } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { MaterialField } from './MaterialField';

@customElement("formsey-multiple-choice-material")
export class MultipleChoiceField extends MaterialField<CheckboxesFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @query("mwc-textfield")
  otherTextField: TextField | undefined

  @queryAll("mwc-radio")
  protected radios: Radio[] | undefined

  renderField() {
    if (!this.definition) return
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i] as Option
        let label = option.label ? option.label : option.value;
        let value = option.value ? option.value : option.label;
        let checked = this.value == value
        templates.push(html`<mwc-formfield label="${label}"><mwc-radio .checked="${checked}" value="${value}" @change="${this.changed}"></mwc-radio></mwc-formfield>`);
      }
    }
    if (this.definition.other) {
      let checked = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label)).length == 0
      templates.push(html`<div class="other"><mwc-formfield label="Other"><mwc-radio .checked="${checked}" value="__other" @change="${this.changed}"></mwc-radio></mwc-formfield><mwc-textfield @input="${this.otherChanged}" ?disabled="${this.definition.disabled || !checked}"></mwc-textfield></div>`);
    }
    return html`${templates}`;
  }

  otherChanged(e: Event) {
    this.value = (<TextField>e.target).value
    this.requestUpdate()
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  changed(e: Event) {
    let value = (<Radio>e.target).value
    let other = false
    if (value == "__other") {
      other = true
      this.value = (this.otherTextField?.value)
    } else {
      this.value = value
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.requestUpdate()
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    if (value == "__other" && other) {
      this.updateComplete.then(() => {
        this.otherTextField?.focus()
      })
    }
  }
}

getLibrary("material").registerComponent("multipleChoice", {
  importPath: "@formsey/fields-material/MultipleChoiceField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string>) => {
    return html`<formsey-multiple-choice-material id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-multiple-choice-material>`
  }
})