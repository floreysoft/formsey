import { Components, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { Field } from '@formsey/core/Field';
import { CheckboxesFieldDefinition, FieldDefinition, Option } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { CheckboxGroupElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { TextFieldElement } from '@vaadin/vaadin-text-field';
import { css, customElement, html, property, query, TemplateResult } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-checkboxes-vaadin")
export class CheckboxesField extends Field<CheckboxesFieldDefinition, string[]> {
  @property({ converter: Object })
  value: string[] = []

  @query("vaadin-checkbox-group")
  private vaadinCheckboxGroup: CheckboxGroupElement;

  @query("vaadin-text-field")
  otherTextField: TextFieldElement

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
    if (!this.value) {
      this.value = []
    }
    let templates: TemplateResult[] = [];
    if (this.definition.options) {
      for (let i = 0; i < this.definition.options.length; i++) {
        let option = this.definition.options[i] as Option
        let label = option.label ? option.label : option.value;
        let value = option.value ? option.value : option.label;
        let checked = this.value.includes(value);
        templates.push(html`<vaadin-checkbox .checked="${checked}" value="${value}">${label}</vaadin-checkbox>`);
      }
    }
    if (this.definition.other) {
      let checked = this.value.filter(value => this.definition.options.filter(option => value == (option.value ? option.value : option.label)).length == 0).length > 0
      templates.push(html`<vaadin-checkbox .checked="${checked}" class="other" value="__other">Other</vaadin-checkbox><vaadin-text-field @input="${this.changed}" ?disabled="${this.definition.disabled || !checked}"></vaadin-text-field>`);
    }
    let customValidity = this.errors.get(this.path())?.validityMessage || this.definition.customValidity
    return html`<vaadin-checkbox-group @change="${this.changed}" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" theme="${this.definition.layout == "horizontal" ? "horizontal" : "vertical"}" ?required="${this.definition.required}" ?disabled="${this.definition.disabled}" error-message="${ifDefined(customValidity)}" >${templates}</vaadin-checkbox-group>`;
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinCheckboxGroup.focus()
    }
  }

  changed(e: Event) {
    let values = []
    let other = false
    for (let value of this.vaadinCheckboxGroup.value) {
      if (value == "__other") {
        other = true
        values.push(this.otherTextField.value)
      } else {
        values.push(value)
      }
    }
    if (!other && this.otherTextField) {
      this.otherTextField.value = ""
    }
    this.value = values
    this.requestUpdate()
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
    }
    if (other) {
      this.updateComplete.then(() => {
        this.otherTextField.focus()
      })
    }
  }

  validate(report: boolean) {
    this.valid = this.vaadinCheckboxGroup.validate() as boolean
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError(this.vaadinCheckboxGroup.errorMessage, false, { })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("checkboxes", {
  importPath: "@formsey/fields-vaadin/CheckboxesField",
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<CheckboxesFieldDefinition, string[]> ) => {
    return html`<formsey-checkboxes-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkboxes-vaadin>`
  }
})