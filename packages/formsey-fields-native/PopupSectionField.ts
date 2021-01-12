import { createField, Field, LabeledField } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { ButtonFieldDefinition, FieldDefinition, FormDefinition, PopupSectionFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

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
  private right: number
  private top: number

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
    const position = `right:${this.right}px;top:${this.top}px`
    return html`${createField(this.components, this.settings, { type: "button", buttonType: "button", icon: this.definition.icon, buttonTextz: this.definition.text, disabled: this.definition.disabled } as ButtonFieldDefinition, undefined, this.path(), this.errors, undefined, (event: InvalidEvent) => this.invalid(event), this.elementId)}
    ${this.visible ? html`<div id="glass" @click="${this.close}"></div>
    <div id="form" style=${position}>${createField(this.components, this.settings, { type: "form", fields: this.definition.fields, layout: this.definition.layout } as FormDefinition, this.value, this.path(), this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</div>` : undefined}`
  }

  firstUpdated() {
    const trigger = this.renderRoot.querySelector('formsey-button') as HTMLElement
    trigger.addEventListener("click", (e: CustomEvent) => {
      e.stopPropagation()
      if (e.detail['name'] == this.path()) {
        this.visible = true
        // Do some clever stuff
        this.top = trigger.offsetHeight
        this.right = 0
      }
    })
  }

  close(e: Event) {
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
    let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
    if (!this.value) {
      this.value = {}
    }
    this.value[name] = e.detail.value;
    this.requestUpdate()
    this.dispatchEvent(new ValueChangedEvent(e.type as "input" | "change" | "inputChange", e.detail.name, this.value));
  }
}

getLibrary("native").registerComponent("popupSection", {
  importPath: "@formsey/fields-native/PopupSectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-popup-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-popup-section>`
  }
})