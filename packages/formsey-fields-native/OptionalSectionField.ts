import { BooleanFieldDefinition, createField, Field, OptionalSectionFieldDefinition, register, ValueChangedEvent } from '@formsey/core';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property, query } from "lit-element/lib/decorators.js";

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
    let checked = false
    if (this.value) {
      checked = true
    }
    let form = checked ? html`<div id="form">${createField(this.components,this.settings,  this.definition.form, this.value, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>` : undefined;
    return html`${createField(this.components, this.settings, { type: "boolean", name: "", label: this.definition.label, helpText: this.definition.helpText, disabled: this.definition.disabled, required: this.definition.required } as BooleanFieldDefinition, checked, this.path(), this.errors, (event: ValueChangedEvent<boolean>) => this.selectionChanged(event), (event: InvalidEvent) => this.invalid(event))}
      ${form}`;
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
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors))
  }

  protected selectionChanged(e: ValueChangedEvent<boolean>) {
    this.value = e.detail.value ? {} : undefined
    this.untouched = false
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    this.focused(e)
  }

  protected changed(e: ValueChangedEvent<any>) {
    let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
    if (!this.value) {
      this.value = {}
    }
    this.value[name] = e.detail.value;
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", this.path(), this.value));
  }
}
register("formsey-optional-section", OptionalSectionField, "native", "optionalSection", { importPath: "@formsey/fields-native/OptionalSectionField,@formsey/fields-native/BooleanField,@formsey/fields-native/StringField" })