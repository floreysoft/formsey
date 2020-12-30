import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { createField, Field } from './Field';
import { InvalidEvent } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';
@customElement("formsey-nested-form")
export class NestedFormField<T extends FormDefinition> extends Field<T, Object> {
  value: Object = {}

  @query('div')
  div: HTMLElement

  render() {
    return html`<div class="nf">${createField(this.components, this.settings, { ...this.definition, type : "form" }, this.value, this.parentPath, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>`;
  }

  public focusField(path: string): boolean {
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
    this.dispatchEvent(new InvalidEvent(e.detail))
  }

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    if (!this.definition.name) {
      // If this is an unnamed form, just pass event to parent
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
    } else {
      this.value = e.detail.value;
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
    }
  }
}
getLibrary("native").registerComponent("nestedForm", {
  importPath: "@formsey/core/NestedFormField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-nested-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-nested-form>`
  }
})
getLibrary("native").registerComponent("nestedLayout", {
  importPath: "@formsey/core/NestedFormField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-nested-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-nested-form>`
  }
})