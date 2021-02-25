import { createField, Field, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ButtonFieldDefinition, FormDefinition, PopupSectionFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';

@customElement("formsey-popup-section")
export class PopupSectionField extends LabeledField<PopupSectionFieldDefinition, Object> {
  @property({ converter: Object })
  value: Object

  @property({ converter: Boolean })
  visible: boolean

  @query("#form")
  form: HTMLElement

  @query("#glass")
  glass: HTMLElement

  private untouched: boolean = true
  private left: string | undefined
  private right: string | undefined
  private top: string | undefined
  private bottom: string | undefined
  private maxWidth: string | undefined
  private maxHeight: string | undefined

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

  renderField() {
    const position = {
      left: this.left,
      right: this.right,
      top: this.top,
      bottom: this.bottom,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      minWidth: `${this.definition.width || 0}${this.definition.widthUnit || "em"}`
    }
    return html`${createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: { type: "button", buttonType: "button", icon: this.definition.icon, text: this.definition.text, disabled: this.definition.disabled } as ButtonFieldDefinition, parentPath: this.path(), errors: this.errors, clickHandler: (event: CustomEvent) => this.open(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}
    ${this.visible ? html`<div id="glass" @click="${this.close}"></div>
    <div id="form" style=${styleMap(position)}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>` : undefined}`
  }

  open(e: CustomEvent) {
    e.stopPropagation()
    if (e.detail['name'] == this.path()) {
      this.visible = true
      // Calculate available popup size / position
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const rect = (<HTMLElement>e.currentTarget).getBoundingClientRect()
      if ((rect.left + rect.width / 2 <= cx)) {
        // Show on the right
        this.left = rect.left + "px"
        this.right = undefined
        this.maxWidth = `${window.innerWidth - rect.left}px`
      } else {
        // Show on the left
        this.left = undefined
        this.right = window.innerWidth - rect.right + "px"
        this.maxWidth = `${rect.right}px`
      }
      if ((rect.top + rect.height / 2 <= cy)) {
        // Show below
        this.top = rect.top + rect.height + "px"
        this.bottom = undefined
        this.maxHeight = `${window.innerHeight - (rect.top + rect.height)}px`
      } else {
        // Show above
        this.top = undefined
        this.bottom = window.innerHeight - rect.top + "px"
        this.maxHeight = `${window.innerHeight - rect.top}px`
      }
    }
  }

  close(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.visible = false;
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
    let valid = true
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

  protected changed(e: ValueChangedEvent<any>) {
    e.stopPropagation()
    if (e.detail?.name) {
      if (!this.definition.name) {
        // If this is an unnamed form, just pass event to parent
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, e.detail.value));
      } else {
        let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
        if (!this.value) {
          this.value = {}
        }
        this.value[name] = e.detail.value;
        this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
      }
    }
  }
}

getLibrary("native").registerComponent("popupSection", {
  importPath: "@formsey/fields-native/PopupSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<PopupSectionFieldDefinition, Object>) => {
    return html`<formsey-popup-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-popup-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})