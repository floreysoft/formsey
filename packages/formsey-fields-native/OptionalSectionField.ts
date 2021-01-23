import { CheckboxFieldDefinition, createField, Field, OptionalSectionFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-optional-section")
export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object

  @query("#form")
  form: HTMLElement

  private untouched: boolean = true

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined" && this.untouched) {
      this.value = this.definition.default
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
      }
    }
    return true
  }

  render() {
    return html`${createField(this.components, this.settings, { type: this.definition.control, name: "", label: this.definition.label, controlLabel: this.definition.controlLabel, helpText: this.definition.helpText, disabled: this.definition.disabled, required: this.definition.required } as CheckboxFieldDefinition, typeof this.value !== "undefined", this.path(), this.errors, (event: ValueChangedEvent<boolean>) => this.selectionChanged(event), (event: InvalidEvent) => this.invalid(event))}
    ${this.value || this.definition.default ? html`<div id="form">${createField(this.components,this.settings, { type: "form", fields: this.definition.fields } as FormDefinition, this.value, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>` : undefined}`
  }

  public focusField(path: string) {
    if (path == this.path()) {
      let child = this.firstElementChild as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path()));
      return (<any>child).focusField(path)
    } else if (this.form) {
      let child = this.form.firstElementChild as Field<any, any>
      if (child && path.startsWith(child.path()) && typeof child['focusField'] == "function") {
        return (<any>child).focusField(path)
      }
    }
    return false
  }

  public validate(report: boolean) {
    let checkbox = this.renderRoot.firstElementChild as Field<any, any>
    let valid = true
    if (report) {
      valid = checkbox.reportValidity();
    } else {
      valid = checkbox.checkValidity();
    }
    if (this.form) {
      let child = this.form.firstElementChild as Field<any, any>
      if (report) {
        valid = valid && child.reportValidity();
      } else {
        valid = valid && child.checkValidity();
      }
    }
    return valid
  }

  protected invalid(e: InvalidEvent) {
    this.dispatchEvent(new InvalidEvent(e.detail))
  }

  protected selectionChanged(e: ValueChangedEvent<boolean>) {
    this.value = e.detail.value ? {} : undefined
    this.untouched = false
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", this.path(), this.value));
    if ( e.type == "input" ) {
      this.focused(e)
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
    if (!this.value) {
      this.value = {}
    }
    this.value[name] = e.detail.value;
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
  }
}

getLibrary("native").registerComponent("optionalSection", {
  importPath: "@formsey/fields-native/OptionalSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-optional-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-optional-section>`
  }
})