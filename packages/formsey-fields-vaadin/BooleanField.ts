import { BooleanFieldDefinition, ValueChangedEvent, register } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

export class BooleanField extends VaadinField<BooleanFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("vaadin-checkbox")
  private vaadinCheckbox: CheckboxElement;

  static get styles() {
    return [...super.styles, css`
    vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }`]
  }

  renderField() {
    let customValidity = this.definition.customValidity
    if (this.error && this.error.validityMessage) {
      customValidity = this.error.validityMessage
    }
    return html`<vaadin-checkbox-group label="${ifDefined(this.definition.label)}" theme="vertical"><vaadin-checkbox @change="${(event) => this.changed(event)}" ?disabled="${this.definition.disabled}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" .indeterminate="${this.definition.indeterminate}" .checked=${this.value} value="${this.definition.name}">${this.definition.label}</vaadin-checkbox></vaadin-checkbox-group>`;
  }

  protected changed(e: any) {
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
    this.errors[this.definition.name] = new InvalidError(this.vaadinCheckbox.errorMessage, false, { ...this.vaadinCheckbox.validity })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}
register("formsey-boolean-vaadin", BooleanField, "vaadin", "boolean", { importPath: "@formsey/fields-vaadin/BooleanField"})