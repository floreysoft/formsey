import { BooleanFieldDefinition, createField, Field, OptionalSectionFieldDefinition, register, ChangeEvent } from '@formsey/core';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { html, property, query } from 'lit-element';
import { NESTED_FORM_STYLE } from './styles';

export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object

  @query("#form")
  form: HTMLElement

  private untouched: boolean = true

  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE]
  }

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined" && this.untouched) {
      this.value = this.definition.default
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
      }
    }
    if (this.definition.hidden) {
      return false
    }
    return true
  }

  render() {
    let checked = false
    if (this.value) {
      checked = true
    }
    this.definition.form.name = this.definition.name
    let form = checked ? html`<div id="form">${createField(this.components, this.definition.form, this.value, this.errors, (event: ChangeEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>` : undefined;
    return html`${createField(this.components, { type: "boolean", name: this.definition.name, label: this.definition.label, helpText: this.definition.helpText, disabled: this.definition.disabled, required: this.definition.required } as BooleanFieldDefinition, checked, this.errors, (event: ChangeEvent<boolean>) => this.selectionChanged(event), (event: InvalidEvent) => this.invalid(event))}
      ${form}`;
  }

  public focusField(path: string) {
    if (this.form) {
      let child = this.form.firstElementChild as Field<any, any>
      if ( child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
        (<any>child).focusField(path)
      }
    }
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

  protected selectionChanged(e: ChangeEvent<boolean>) {
    this.value = e.detail.value ? {} : undefined
    this.untouched = false
    this.requestUpdate()
    this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
  }

  protected changed(e: ChangeEvent<any>) {
    this.value = e.detail.value;
    this.requestUpdate()
    this.dispatchEvent(new ChangeEvent(e.detail.name, this.value));
  }
}
register("formsey-optional-section", OptionalSectionField)