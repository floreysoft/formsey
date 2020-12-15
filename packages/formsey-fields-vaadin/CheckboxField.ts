import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { Field } from '@formsey/core/Field';
import { CheckboxFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { css, customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-checkbox-vaadin")
export class CheckboxField extends Field<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("vaadin-checkbox")
  private vaadinCheckbox: CheckboxElement;

  static get styles() {
    return [css`
    vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }`]
  }

  render() {
    let customValidity = this.definition.customValidity
    const error = this.errors.get(this.path())
    if (error?.validityMessage) {
      customValidity = error?.validityMessage
    }
    return html`<vaadin-checkbox-group label="${ifDefined(this.definition.label as string)}" .helperText="${this.definition.helpText as string}" theme="vertical"><vaadin-checkbox @change=${this.changed} ?disabled="${this.definition.disabled}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" .indeterminate="${this.definition.indeterminate}" .checked=${this.value} value="${this.definition.name}">${this.definition.controlLabel || ""}</vaadin-checkbox></vaadin-checkbox-group>`;
  }

  protected changed(e: Event) {
    e.stopPropagation()
    this.value = this.vaadinCheckbox.checked;
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.vaadinCheckbox.focus()
    }
  }
  validate(report: boolean) {
    this.valid = !(!this.vaadinCheckbox.checked && this.definition.required)
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    this.errors[this.definition.name] = new InvalidError("Please check", false, { })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

getLibrary("vaadin").registerComponent("checkbox", {
  importPath: "@formsey/fields-vaadin/CheckboxField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-checkbox-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox-vaadin>`
  }
})

getLibrary("vaadin").registerComponent("switch", {
  importPath: "@formsey/fields-vaadin/CheckboxField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-checkbox-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-checkbox-vaadin>`
  }
})