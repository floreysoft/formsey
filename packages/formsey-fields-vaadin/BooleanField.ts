import { BooleanFieldDefinition, registerComponent, ValueChangedEvent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { css, html } from "lit-element";
import { property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
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
    this.errors[this.definition.name] = new InvalidError("Please check", false, { })
    this.dispatchEvent(new InvalidEvent(this.errors))
  }
}

registerComponent({
  type: "boolean",
  tag: "formsey-boolean-vaadin",
  constructor: BooleanField,
  libraries: ["vaadin" ],
  importPath: "@formsey/fields-vaadin/BooleanField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-boolean-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-boolean-vaadin>`
  }
})