import { html } from 'lit-element';
import { query } from "lit-element/lib/decorators.js";
import { createField, Field } from './Field';
import { NestedFormDefinition } from './FieldDefinitions';
import { InvalidEvent } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';

export class NestedFormField extends Field<NestedFormDefinition, Object> {
  value: Object = {}

  @query('div')
  div: HTMLElement

  render() {
    if (!this.value) {
      this.value = {}
    }
    if (!this.definition.form) {
      this.definition.form = {
        fields: []
      }
    }
    this.definition.form.name = this.definition.name
    return html`<div class="nf">${createField(this.components, this.settings, this.definition.form, this.value, this.parentPath, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`;
  }

  public focusField(path: string) : boolean {
    let child = this.div.firstElementChild as Field<any, any>
    if (child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
      return (<any>child).focusField(path)
    }
    return false
  }

  public validate(report: boolean) {
    let child = this.div.firstElementChild as Field<any, any>
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

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    this.value = e.detail.value;
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
  }
}