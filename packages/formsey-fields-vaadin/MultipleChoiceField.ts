import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { Field } from '@formsey/core/Field';
import { CheckboxesFieldDefinition, FieldDefinition, Option } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { RadioGroupElement } from '@vaadin/vaadin-radio-button/vaadin-radio-group';
import { TextFieldElement } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, query, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-multiple-choice-vaadin")
export class MultipleChoiceField extends Field<CheckboxesFieldDefinition, String> {
  @property({ type: String })
  value: string;

  @query("vaadin-radio-group")
  private vaadinRadioGroup: RadioGroupElement;

  @query("vaadin-text-field")
  otherTextField: TextFieldElement

  static get styles() {
    return [...super.styles, css`
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
      <vaadin-text-field @input="${this.changed}" ?disabled=${this.definition.disabled || !checked} .value="${checked ? this.value : ''}"></vaadin-text-field>`);
    }
    const customValidity = this.errors.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<vaadin-radio-group @value-changed="${this.changed}" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" theme="${this.definition.layout == "horizontal" ? "horizontal" : "vertical"}" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-radio-group>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinRadioGroup.focus()
    }
  }
  changed(e: Event) {
    this.value = this.vaadinRadioGroup.value
    let other = false
    if (this.value == "__other") {
      other = true
      this.value = this.otherTextField.value
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
    }
    if (other) {
      this.updateComplete.then(() => {
        let that = this
        setTimeout(
          function () { that.otherTextField.focus() }, 100);
      })
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
    this.errors.set(this.path(), new InvalidError(this.vaadinRadioGroup.errorMessage, false, { }))
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("multipleChoice", {
  importPath: "@formsey/fields-vaadin/MultipleChoiceField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-multiple-choice-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-multiple-choice-vaadin>`
  }
})