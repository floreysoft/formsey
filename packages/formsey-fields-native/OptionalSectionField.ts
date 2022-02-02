import { CheckboxFieldDefinition, createField, Field, FieldInputEvent, OptionalSectionFieldDefinition } from '@formsey/core';
import { FieldChangeEvent, FieldClickEvent } from '@formsey/core/Events';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/Events';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';


@customElement("formsey-optional-section")
export class OptionalSectionField extends Field<OptionalSectionFieldDefinition, { [key: string]: any }> {
  @query("#form")
  form: HTMLElement | undefined

  @query("section>div:first-child")
  switch: HTMLElement | undefined

  private untouched: boolean = true
  private on: boolean = false

  protected layoutController: LayoutController = new LayoutController(this)

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
        this.dispatchEvent(new FieldChangeEvent(this.definition.name, this.value));
      }
    }
    return true
  }

  render() {
    if (this.definition) {
      this.layoutController.updateLayout(this.definition.layout)
      const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
      const style = formatter ? `${formatter.innerBoxStyle?.(this.layoutController?.layout)};${formatter.outerBoxStyle?.(this.layoutController?.layout)};${formatter.backgroundStyle?.(this.layoutController?.layout)}` : ""
      const on = this.definition.name ? typeof this.value !== "undefined" : this.on;
      return html`<section style="${style}"><div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: this.definition.control, name: "", label: this.definition.label, controlLabel: this.definition.controlLabel, helpText: this.definition.helpText, disabled: this.definition.disabled, required: this.definition.required } as CheckboxFieldDefinition, value: on, parentPath: this.path(), errors: this.errors, changeHandler:  this.selectionChanged, invalidHandler: this.invalid })}
    ${on ? html`<div id="form">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout, deferLayout: true } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, clickHandler: this.clicked, inputHandler: this.changed, invalidHandler: this.invalid })}</div>` : undefined}</div></section>`
    }
  }

  public focusField(path: string) {
    if (path == this.path()) {
      let child = this.firstElementChild as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path()));
      return (<any>child).focusField(path)
    } else if (this.form) {
      let child = this.form.firstElementChild as Field<any, any>
      if (child && path.startsWith(child.path()) && typeof (<any>child)['focusField'] == "function") {
        return (<any>child).focusField(path)
      }
    }
    return false
  }

  public validate(report: boolean) {
    let checkbox = this.switch!.nextElementSibling as Field<any, any>
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

  protected selectionChanged(e: FieldChangeEvent<boolean>) {
    if (this.definition?.name) {
      this.value = e.detail.value ? {} : undefined;
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    } else {
      this.on = !this.on
    }
    this.untouched = false
    this.requestUpdate()
    this.focused(e)
  }

  protected changed(e: FieldChangeEvent<any>) {
    if (this.definition && e.detail?.name) {
      if (typeof this.definition.name === "undefined" || this.definition.name === "") {
        // If this is an unnamed form, just pass event to parent
        this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, e.detail.value) : new FieldChangeEvent(e.detail.name, e.detail.value));
      } else {
        let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
        if (!this.value) {
          this.value = {}
        }
        this.value[name] = e.detail.value;
        this.requestUpdate()
        this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, this.value) : new FieldChangeEvent(e.detail.name, this.value));
      }
    }
  }
}

getLibrary("native").registerComponent("optionalSection", {
  importPath: "@formsey/fields-native/OptionalSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, inputHandler, invalidHandler, id }: Resources<OptionalSectionFieldDefinition, Object>) => {
    return html`<formsey-optional-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @click="${clickHandler}" @input="${inputHandler}" @invalid=${invalidHandler}></formsey-optional-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})