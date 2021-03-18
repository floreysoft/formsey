import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, FieldClickEvent, LabeledField } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { ButtonFieldDefinition, DialogSectionFieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldInputEvent } from '@formsey/core/FieldInputEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { ButtonField } from './ButtonField';

@customElement("formsey-dialog-section")
export class DialogSectionField extends LabeledField<DialogSectionFieldDefinition, { [key: string]: any }> {
  @query("#form")
  form: HTMLElement | undefined

  @query(".dialog")
  private _dialog: HTMLDialogElement | undefined

  private x: number | undefined
  private y: number | undefined
  private dragging: boolean | undefined
  private left: string | undefined
  private top: string | undefined
  private keyHandler = (e: KeyboardEvent) => this.keyDown(e)
  private cancelValue = undefined
  private layoutController: LayoutController | undefined

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default
    }
    return true
  }

  renderField() {
    if (this.definition) {
      const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
      const style = `left:${this.left || "auto"};top:${this.top || "auto"};position:${this.left ? "fixed" : "relative"};width:${this.definition.width || "auto"};max-height:${this.definition.height || "auto"};${formatter ? `${formatter.outerBoxStyle?.(this.layoutController?.layout)};${formatter.backgroundStyle?.(this.layoutController?.layout)}` : ""}`
      return html`
    ${this.definition.icon || this.definition.text ? createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: { type: "button", buttonType: "button", icon: this.definition.icon, text: this.definition.text, disabled: this.definition.disabled } as ButtonFieldDefinition, parentPath: this.path(), errors: this.errors, clickHandler: (event: CustomEvent) => this.open(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) }) : undefined}
    ${this.definition.visible ? html`
    <div class="dialogWrapper" @mouseup=${this.endDrag} @mousemove=${this.drag}>
      <focus-trap>
        <div class="dialog" style=${style}>
          ${this.definition.header ? html`<header @mousedown=${this.startDrag} @mouseup=${this.endDrag} @mousemove=${this.drag}>${this.definition.header}</header>` : undefined}
          <div id="form" style="overflow-y:auto;flex-grow:1;${formatter ? formatter.innerBoxStyle?.(this.layoutController?.layout) : ""}">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, deferLayout: true, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.changed(event), inputHandler: (event: FieldInputEvent<any>) => this.inputted(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</div>
          <footer>
            ${this.definition.actions?.map((action: ButtonFieldDefinition) => html`${createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: { type: "button", name: action.name, buttonType: "button", text: action.text, icon: action.icon } as ButtonFieldDefinition, parentPath: this.path(), clickHandler: e => this.buttonClicked(e) })}`)}
          </footer>
        </div>
      </focus-trap>
    </div>` : undefined
        } `
    }
  }

  open(e: Event) {
    e.stopPropagation()
    if (this.definition) {
      this.cancelValue = JSON.parse(JSON.stringify(this.value || {}))
      this.definition.visible = true
      document.addEventListener('keydown', this.keyHandler)
      this.requestUpdate()
      this.updateComplete.then(() => {
        this.layoutController = new LayoutController(this, this._dialog)
        this.addController(this.layoutController)
        setTimeout(() => {
          if (this.definition) {
            this.focusField(this.path() + "." + (this.definition.focus || this.definition.fields[0].name))
            this.dispatchEvent(new FieldClickEvent(this.path()))
          }
        }, 1)
      })
    }
  }

  public focusField(path: string) {
    let child = this.form?.firstElementChild as Field<any, any>
    if (child && typeof (<any>child)['focusField'] == "function") {
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

  protected changed(e: FieldChangeEvent<any>) {
    e.stopPropagation()
    if (e.detail?.name && this.definition?.name) {
      let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
      if (!this.value) {
        this.value = {}
      }
      this.value[name] = e.detail.value;
      this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
    }
  }

  protected startDrag(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const rect = this._dialog?.getBoundingClientRect()
    if (rect) {
      let left = rect.left
      let top = rect.top
      this.x = e.screenX - left
      this.y = e.screenY - top
      this.dragging = true;
    }
  }

  protected endDrag(e: MouseEvent) {
    this.dragging = false;
  }

  protected drag(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (this.dragging) {
      this.left = (e.screenX - (this.x || 0)) + "px"
      this.top = (e.screenY - (this.y || 0)) + "px"
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
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value))
  }

  private close(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    if (this.layoutController) {
      this.removeController(this.layoutController)
    }
    this.top = undefined
    this.left = undefined
    if (this.definition) {
      this.definition.visible = false;
    }
    document.removeEventListener('keydown', this.keyHandler)
    const trigger = this.renderRoot.querySelector('formsey-button') as ButtonField
    trigger.focusField()
    this.requestUpdate()
  }
}

getLibrary("native").registerComponent("dialogSection", {
  importPath: "@formsey/fields-native/DialogSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, clickHandler, invalidHandler, id }: Resources<DialogSectionFieldDefinition, Object>) => {
    return html`<formsey-dialog-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @click=${clickHandler} @invalid=${invalidHandler}></formsey-dialog-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})