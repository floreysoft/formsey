import { Field } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/Events';
import { CheckboxesFieldDefinition, Option } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/checkbox-group";
import "@vaadin/checkbox";
import '@vaadin/radio-group';
import { RadioGroup } from '@vaadin/radio-group';
import { TextField } from '@vaadin/text-field';
import { css, html, TemplateResult } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { createComparator } from '@formsey/fields-native';


@customElement("formsey-multiple-choice-vaadin")
export class MultipleChoiceField extends Field<CheckboxesFieldDefinition, String> {
  @query("vaadin-radio-group")
  private vaadinRadioGroup: RadioGroup | undefined

  @query("vaadin-text-field")
  otherTextField: TextField | undefined

  static get styles() {
    return [css`
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
    .other {
      margin-top: 0.4em;
      display: flex;
      flex-direction: row;
      align-items: center;
    }`]
  }

  render() {
    if (!this.definition) return
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i] as Option
        let label = option.label ? option.label : option.value;
        let value = option.value ? option.value : option.label;
        let checked = value == this.value;
        templates.push(html`<vaadin-radio-button value="${value}" .checked="${checked}">${label}</vaadin-radio-button>`);
      }
    }
    if (this.definition.other) {
      let filtered = this.definition.options.filter(option => this.value == (option.value ? option.value : option.label))
      let checked = (typeof this.value != "undefined") && (filtered.length == 0)
      templates.push(html`<vaadin-radio-button class="other" value="__other" .checked="${checked}">Other</vaadin-radio-button>
      <vaadin-text-field @input="${this.changed}" ?disabled=${this.definition.disabled || !checked} .value=${checked ? this.value || <string>"" : ""}></vaadin-text-field>`);
    }
    const customValidity = this.errors?.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<vaadin-radio-group @value-changed="${this.changed}" label="${ifDefined(this.definition.label)}" .helperText="${typeof this.definition.helpText == "string" ? this.definition.helpText : ""}" theme="${this.definition.layout == "horizontal" ? "horizontal" : "vertical"}" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-radio-group>`;
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.vaadinRadioGroup?.focus()
    }
  }
  changed(e: Event) {
    const isSame = createComparator(this.value)
    this.value = this.vaadinRadioGroup!.value || undefined
    let other = false
    if (this.value == "__other") {
      other = true
      this.value = this.otherTextField!.value
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.requestUpdate()
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value, !isSame(this.value)));
    if (other) {
      this.updateComplete.then(() => {
        let that = this
        setTimeout(
          function () { that.otherTextField?.focus() }, 100);
      })
    }
  }

  validate(report: boolean) {
    this.valid = report ? this.vaadinRadioGroup?.validate() || false : this.vaadinRadioGroup?.checkValidity() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors = this.errors || new InvalidErrors()
    this.errors.set(this.path(), new InvalidError(this.vaadinRadioGroup?.errorMessage || "", false, {}))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("multipleChoice", {
  importPath: "@formsey/fields-vaadin/MultipleChoiceField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxesFieldDefinition, string>) => {
    return html`<formsey-multiple-choice-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-multiple-choice-vaadin>`
  }
})