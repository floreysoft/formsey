import { ChangeEvent, createField, Field, NestedFormDefinition } from '@formsey/core';
import { InvalidEvent } from './InvalidEvent';

export class NestedFormField extends Field<NestedFormDefinition, Object> {
  value: Object = {}

  render() {
    if (!this.value) {
      this.value = {}
    }
    this.definition.form.name = this.definition.name
    return createField(this.components, this.definition.form, this.value, this.errors, (event: ChangeEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event));
  }

  public focusField(path: string) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
      (<any>child).focusField(path)
    }
  }

  public resize() {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (child) {
      child.resize()
    }
  }

  public validate(report: boolean) {
    let child = this.renderRoot.firstElementChild as Field<any, any>
    if (report) {
      return child.reportValidity();
    } else {
      return child.checkValidity();
    }
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors))
  }

  protected changed(e: ChangeEvent<any>) {
    e.stopPropagation()
    this.value = e.detail.value;
    this.dispatchEvent(new ChangeEvent(e.detail.name, this.value));
  }
}