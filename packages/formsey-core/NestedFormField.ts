import { ChangeEvent, createField, Field, NestedFormDefinition, ClickEvent } from '@formsey/core';
import { html, query } from 'lit-element';
import { InvalidEvent } from './InvalidEvent';

export class NestedFormField extends Field<NestedFormDefinition, Object> {
  value: Object = {}

  @query('div')
  div: HTMLElement

  render() {
    if (!this.value) {
      this.value = {}
    }
    this.definition.form.name = this.definition.name
    return html`<div class="nf">${createField(this.components, this.definition.form, this.value, this.errors, (event: ChangeEvent<any>) => this.changed(event),  (event: ClickEvent<any>) => this.clicked(event), (event: InvalidEvent) => this.invalid(event))}</div>`;
  }

  public focusField(path: string) {
    let child = this.div.firstElementChild as Field<any, any>
    if (child && path.startsWith(child.definition?.name) && typeof child['focusField'] == "function") {
      (<any>child).focusField(path)
    }
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

  protected changed(e: ChangeEvent<any>) {
    e.stopPropagation()
    this.value = e.detail.value;
    this.dispatchEvent(new ChangeEvent(e.detail.name, this.value));
  }
}