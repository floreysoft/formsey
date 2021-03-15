import { html, TemplateResult } from "lit";
import { customElement, property, queryAll } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { createField, Field } from './Field';
import { FieldClickEvent } from "./FieldClickEvent";
import { FieldDefinition, FormDefinition } from './FieldDefinitions';
import { InvalidErrors, InvalidEvent } from './InvalidEvent';
import { LabeledField } from "./LabeledField";
import { LayoutController } from "./LayoutController";
import { Breakpoints, Layout } from "./Layouts";
import { Components, getFormatter, getLibrary, Resources } from './Registry';
import { ValueChangedEvent } from './ValueChangedEvent';

export function isFormDefinition(definition: FieldDefinition): definition is FormDefinition {
  return definition['fields'] !== undefined;
}

export function removeDeletedFields<V>(components: Components, definition: FormDefinition, value: Object) {
  if (definition && definition.fields && value) {
    // Only keep fields that are defined
    let newValue = {} as V
    addDefinedFields(components, definition.fields, value, newValue)
    addMemberValueIfPresent("type", newValue, value)
    addMemberValueIfPresent("data", newValue, value)
    return newValue
  }
}

function addDefinedFields(components: Components, fields: FieldDefinition[], value: Object, newValue: Object) {
  for (let field of fields) {
    if (typeof field.name !== "undefined" && field.name !== "") {
      if (typeof value[field.name] !== "undefined") {
        newValue[field.name] = value[field.name]
      }
    } else {
      // Fetch all unnamed forms/fields to keep lifted fields
      const nestedForms = components[field.type]?.nestedFields?.(field, value)
      if (nestedForms) {
        addDefinedFields(components, nestedForms, value, newValue)
      }
    }
  }
}

function addMemberValueIfPresent(name: string, newValue: Object, value: Object) {
  if (typeof value[name] != "undefined") {
    newValue[name] = value[name]
  }
}

export const SUPPORTED_BREAKPOINTS = ["xs", "s", "m", "l", "xl"]

export const DEFAULT_BREAKPOINTS: Breakpoints = {
  "xs": 320,
  "s": 568,
  "m": 768,
  "l": 1024,
  "xl": 1366
}
@customElement("formsey-form-field")
export class FormField<D extends FormDefinition, V extends any> extends LabeledField<D, V> {
  @property({ converter: Object })
  // @ts-ignore()
  set value(value: V) {
    this._value = value
    this._value = removeDeletedFields<V>(this.library.components, this._definition, value)
    this.applyHiddenFields()
    this.requestUpdate()
  }

  get value() {
    return this._value
  }

  @property({ converter: Object })
  // @ts-ignore()
  set definition(definition: D) {
    this._definition = definition;
    this.applyHiddenFields();
    this.requestUpdate();
  }

  get definition() {
    return this._definition
  }

  protected _value: V | undefined
  protected _definition: D | undefined

  @queryAll(".fff")
  protected _fields: HTMLElement[] | undefined
  protected layoutController = new LayoutController(this)

  constructor() {
    super()
    this.addController(this.layoutController)
  }

  renderField() {
    let templates: TemplateResult[] = []
    let hidden: TemplateResult[] = []
    this.layoutController.updateLayout(this.definition.layout)
    const formatter = this.layoutController.layout?.formatter ? getFormatter(this.layoutController.layout?.formatter) : undefined
    if (this.definition.fields) {
      for (const [index, field] of this.definition.fields.entries()) {
        const value = this.value && field.name ? this.value[field.name] : this.value
        let fieldTemplate = createField({ library: this.library, context: this.context, settings: this.settings, definition: field, value: value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), clickHandler: (event: FieldClickEvent<any>) => this.clicked(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })
        if (field.type == "hidden") {
          hidden.push(fieldTemplate)
        } else {
          templates.push(html`<div class='fff' style="${ifDefined(formatter?.fieldStyle(this.layoutController.layout, field, this.definition.fields, index))}">${fieldTemplate}</div>`)
        }
      }
    }
    const boxStyle = !this.definition.deferLayout ? `${formatter?.outerBoxStyle?.(this.layoutController.layout) || ""};${formatter?.innerBoxStyle?.(this.layoutController.layout) || ""};${formatter?.backgroundStyle?.(this.layoutController.layout) || ""};` : ""
    const style = `${boxStyle}${formatter?.containerStyle(this.layoutController.layout, this.definition) || ""}`
    return html`<section>
      <div class="ffg" style="${style}">${!this.definition.deferLayout && formatter?.backgroundStyle ? html`<div class="fbg" style=${formatter?.elevationStyle?.(this.layoutController.layout) || ""}></div>` : undefined}${templates}</div>${hidden}
    </section>`
  }

  public focusField(path: string): boolean {
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      if (child && typeof child['focusField'] == "function" && path?.startsWith(child.path())) {
        return (<any>child).focusField(path)
      }
    }
    return false
  }

  public clearCustomValidity() {
    super.clearCustomValidity()
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      child.clearCustomValidity()
    }
  }

  public setCustomValidity(customErrors: InvalidErrors) {
    super.setCustomValidity(customErrors)
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      child.clearCustomValidity()
      child.setCustomValidity(customErrors)
    }
  }

  public validate(report: boolean, path?: string) {
    let validity = true;
    for (let field of this._fields) {
      let child = field.firstElementChild as Field<any, any>
      let valid: boolean
      if (report) {
        valid = child.reportValidity();
      } else {
        valid = child.checkValidity();
      }
      if (!valid) {
        validity = false;
      }
    }
    return validity;
  }

  public layoutChanged(layout: Layout) {
    if (this.definition.deferLayout) {
      this.dispatchEvent(new CustomEvent('layoutChanged', { bubbles: true, composed: true, detail: layout }))
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    if (e.detail?.name) {
      if (typeof this.definition.name === "undefined" || this.definition.name === "") {
        // If this is an unnamed form, just pass event to parent
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
      } else {
        let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
        if (!this.value) {
          this.value = {} as V
        }
        this.value[name] = e.detail.value;
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
      }
    }
  }

  protected applyHiddenFields() {
    if (this._definition && this._definition.fields && this._value) {
      for (let field of this._definition.fields) {
        if (field.type == "hidden") {
          if (field.name && field.default) {
            this._value[field.name] = field.default;
          }
        }
      }
    }
  }
}
getLibrary("native").registerComponent("form", {
  importPath: "@formsey/core/FormField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-form-field id=${ifDefined(id)} .library=${library} .settings=${settings} .definition=${definition} .context=${{ ...context, enclosingForm: value }} .value=${value} .parentPath=${parentPath} .errors=${errors} @click=${clickHandler} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-form-field>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})