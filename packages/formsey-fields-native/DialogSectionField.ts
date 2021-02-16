import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, FieldClickEvent, LabeledField } from '@formsey/core';
import { ButtonFieldDefinition, DialogSectionFieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';
import { ButtonField } from './ButtonField';

@customElement("formsey-dialog-section")
export class DialogSectionField extends LabeledField<DialogSectionFieldDefinition, Object> {
  @query("#form")
  form: HTMLElement

  @query(".dialog")
  private _dialog: HTMLDialogElement

  private x: number
  private y: number
  private dragging: boolean
  private left: string | undefined
  private top: string | undefined
  private keyHandler = (e: KeyboardEvent) => this.keyDown(e)
  private cancelValue = undefined

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default
    }
    return true
  }

  renderField() {
    const position = {
      left: this.left,
      top: this.top,
      position: this.left ? "fixed" : "relative"
    }
    return html`
    ${this.definition.icon || this.definition.text ? createField({ id: this.elementId, components: this.components, context: this.context, settings: this.settings, definition: { type: "button", buttonType: "button", icon: this.definition.icon, text: this.definition.text, disabled: this.definition.disabled } as ButtonFieldDefinition, parentPath: this.path(), errors: this.errors, invalidHandler: (event: InvalidEvent) => this.invalid(event) }) : undefined}
    ${this.definition.visible ? html`
    <div class="dialogWrapper" @mouseup=${this.endDrag} @mousemove=${this.drag}>
      <focus-trap>
        <div class="dialog" style=${styleMap(position)}>
          ${this.definition.header ? html`<header @mousedown=${this.startDrag} @mouseup=${this.endDrag} @mousemove=${this.drag}>${this.definition.header}</header>` : undefined}
          <div id="form">${createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
          <footer>
            ${this.definition.actions?.map((action: ButtonFieldDefinition) => html`${createField({ id: this.elementId, components: this.components, context: this.context, settings: this.settings, definition: { type: "button", name: action.name, buttonType: "button", text: action.text, icon: action.icon } as ButtonFieldDefinition, parentPath: this.path(), clickHandler: e => this.buttonClicked(e) })}`)}
          </footer>
        </div>
      </focus-trap>
    </div>` : undefined}`
  }

  firstUpdated() {
    const trigger = this.renderRoot.querySelector('formsey-button') as HTMLElement
    trigger.addEventListener("click", (e: CustomEvent) => {
      this.cancelValue = JSON.parse(JSON.stringify(this.value || {}))
      e.stopPropagation()
      if (e.detail['name'] == this.path()) {
        this.definition.visible = true
        document.addEventListener('keydown', this.keyHandler)
        this.updateComplete.then(() => {
          setTimeout(() => {
            this.focusField(this.path() + "." + this.definition.fields[0].name)
            this.dispatchEvent(new FieldClickEvent(this.path()))
          }, 1)
        })
        this.requestUpdate()
      }
    })
  }

  public focusField(path: string) {
    let child = this.form.firstElementChild as Field<any, any>
    if (child && typeof child['focusField'] == "function") {
      return (<any>child).focusField(path)
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
    if (e.detail?.name && this.definition.name) {
      let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
      if (!this.value) {
        this.value = {}
      }
      this.value[name] = e.detail.value;
      this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
    }
  }

  protected startDrag(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    let left = this._dialog.getBoundingClientRect().left
    let top = this._dialog.getBoundingClientRect().top
    this.x = e.screenX - left
    this.y = e.screenY - top
    this.dragging = true;
  }

  protected endDrag(e: MouseEvent) {
    this.dragging = false;
  }

  protected drag(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (this.dragging) {
      this.left = (e.screenX - this.x) + "px"
      this.top = (e.screenY - this.y) + "px"
      this.requestUpdate()
    }
  }

  private buttonClicked(e: CustomEvent) {
    this.dispatchEvent(new FieldClickEvent(e.detail.name, this.value))
    if (e.detail.name == "cancel") {
      this.cancel()
    }
    this.close(e)
  }

  private keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.RETURN:
        this.close(e)
        break;
      case KEYCODE.ESCAPE:
        this.cancel()
        this.close(e)
        break;
    }
  }

  private cancel() {
    this.value = this.cancelValue
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value))
  }

  private close(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.top = undefined
    this.left = undefined
    this.definition.visible = false;
    document.removeEventListener('keydown', this.keyHandler)
    const trigger = this.renderRoot.querySelector('formsey-button') as ButtonField
    trigger.focusField()
    this.requestUpdate()
  }
}

getLibrary("native").registerComponent("dialogSection", {
  importPath: "@formsey/fields-native/DialogSectionField",
  template: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<DialogSectionFieldDefinition, Object>) => {
    return html`<formsey-dialog-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @click=${clickHandler} @invalid=${invalidHandler}></formsey-dialog-section>`
  }
})