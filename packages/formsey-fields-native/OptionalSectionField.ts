import { CheckboxFieldDefinition, createField, Field, OptionalSectionFieldDefinition } from '@formsey/core';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { Layout } from '@formsey/core/Layouts';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-optional-section")
export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object

  @query("#form")
  form: HTMLElement

  private untouched: boolean = true
  private on: boolean = false
  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

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
    this.layoutController.updateLayout(this.definition.layout)
    const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
    const style = formatter ? `${formatter.innerBoxStyle(this.layoutController?.layout)};${formatter.outerBoxStyle(this.layoutController?.layout)};${formatter.backgroundStyle(this.layoutController?.layout)}` : ""
    const on = this.definition.name ? typeof this.value !== "undefined" : this.on;
    return html`<section style="${style}"><div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: this.definition.control, name: "", label: this.definition.label, controlLabel: this.definition.controlLabel, helpText: this.definition.helpText, disabled: this.definition.disabled, required: this.definition.required } as CheckboxFieldDefinition, value: on, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<boolean>) => this.selectionChanged(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}
    ${on ? html`<div id="form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout, deferLayout: true } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>` : undefined}</div></section>`
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
    if (this.definition.name) {
      this.value = e.detail.value ? {} : undefined;
      this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", this.path(), this.value));
    } else if (e.type == "input") {
      this.on = !this.on
    }
    this.untouched = false
    this.requestUpdate()
    if (e.type == "input") {
      this.focused(e)
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    if (e.detail?.name) {
      if (typeof this.definition.name === "undefined" || this.definition.name === "") {
        // If this is an unnamed form, just pass event to parent
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
      } else {

        let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
        if (!this.value) {
          this.value = {}
        }
        this.value[name] = e.detail.value;
        this.requestUpdate()
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
      }
    }
  }
}

getLibrary("native").registerComponent("optionalSection", {
  importPath: "@formsey/fields-native/OptionalSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<OptionalSectionFieldDefinition, Object>) => {
    return html`<formsey-optional-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-optional-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})