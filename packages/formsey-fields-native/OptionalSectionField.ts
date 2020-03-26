import { BooleanFieldDefinition, createField, OptionalSectionFieldDefinition, ValueChangedEvent, Field } from '@formsey/core';
import { customElement, html, property } from 'lit-element';

@customElement("formsey-optional-section")
export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: WebGLVertexArrayObjectOES

  private untouched : boolean = true

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined" && this.untouched) {
      this.value = this.definition.default
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    if (this.definition.hidden) {
      return false
    }
    return true
  }

  renderField() {
    let checked = false
    if ( this.value ) {
      checked = true
    }
    this.definition.form.name = this.definition.name
    let form = checked ? html`<div class="fs-nested-form">${createField(this.configuration, this.definition.form, this.value, this.errors, (event: ValueChangedEvent<any>) => this.valueChanged(event), null)}</div>` : undefined;
    return html`${createField(this.configuration, { type: "boolean", prompt: this.definition.prompt, helpText: this.definition.helpText, label: this.definition.label ? this.definition.label : this.definition.prompt, disabled: this.definition.disabled, required: this.definition.required } as BooleanFieldDefinition, checked, this.errors, (event: ValueChangedEvent<boolean>) => this.selectionChanged(event), null)}
      ${form}`;
  }

  protected selectionChanged(e: ValueChangedEvent<boolean>) {
    this.value = e.value ? {} : undefined
    this.untouched = false
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
  }

  protected valueChanged(e: any) {
    this.value = e.value;
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.name, this.value));
  }
}