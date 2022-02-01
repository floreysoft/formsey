import { KEYCODE } from '@floreysoft/utils';
import { createField, Field, FieldClickEvent, FormField, LabeledField } from '@formsey/core';
import { FieldChangeEvent, FieldInputEvent } from '@formsey/core/Events';
import { ButtonFieldDefinition, DialogSectionFieldDefinition, FormDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { ButtonField } from './ButtonField';

@customElement("formsey-dialog-section")
export class DialogSectionField extends LabeledField<DialogSectionFieldDefinition, { [key: string]: any }> {
  @state() visible = false

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
      return html`${this.definition.trigger ? createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: this.definition.trigger, parentPath: this.path(), errors: this.errors, clickHandler: this.triggered, invalidHandler: this.invalid }) : undefined}
    ${this.visible ? html`
    <div class="dialogWrapper" @mouseup=${this.endDrag} @mousemove=${this.drag}>
      <focus-trap>
        <div class="dialog" style=${style}>
          ${this.definition.header ? html`<header @mousedown=${this.startDrag} @mouseup=${this.endDrag} @mousemove=${this.drag}>${this.definition.header}</header>` : undefined}
          <div id="form" style="overflow-y:auto;flex-grow:1;${formatter ? formatter.innerBoxStyle?.(this.layoutController?.layout) : ""}">${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", fields: this.definition.fields, deferLayout: true, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: this.changed, inputHandler: this.changed, clickHandler: this.clicked, invalidHandler: this.invalid })}</div>
          <footer>
            ${this.definition.actions?.map((action: ButtonFieldDefinition) => html`${createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: { type: "button", buttonType: "button", name: action.name, text: action.text, icon: action.icon, theme: action.theme } as ButtonFieldDefinition, parentPath: this.path(), clickHandler: this.buttonClicked })}`)}
          </footer>
        </div>
      </focus-trap>
    </div>` : undefined
        } `
    }
  }

  public focusField(path: string) {
    if (path == this.path()) {
      this.open()
      return true
    } else {
      let child = this.form?.firstElementChild as Field<any, any>
      if (child && typeof (<any>child)['focusField'] == "function") {
        return (<any>child).focusField(path)
      }
      return false
    }
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

  public async close(e?: Event) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    this.top = undefined
    this.left = undefined
    document.removeEventListener('keydown', this.keyHandler)
    const trigger = this.renderRoot.querySelector('formsey-button') as ButtonField
    if (trigger) {
      trigger.focusField()
    }
    this.visible = false;
    // Await is required to avoid reopening the dialog on render
    await this.updateComplete;
    if (this.layoutController) {
      this.removeController(this.layoutController)
      this.layoutController = undefined
    }
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
      this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, this.value) : new FieldChangeEvent(e.detail.name, this.value));
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
    if (e.detail.name?.endsWith("cancel")) {
      this.cancel()
      this.close(e)
    } else if (this.validate(true)) {
      this.dispatchEvent(new FieldClickEvent(e.detail.name, this.value))
      this.close(e)
    }
  }

  private keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.RETURN:
        // Send primary button
        if (this.form) {
          let child = this.form.firstElementChild as FormField<FormDefinition, any>
          this.value = child.value
        }
        const primaryAction = this.definition?.actions?.filter((action: ButtonFieldDefinition) => typeof action.name != "undefined" && action.theme == "primary")?.[0]
        if (primaryAction) {
          this.dispatchEvent(new FieldClickEvent(this.path() + "." + primaryAction.name, this.value))
        }
        this.close(e)
        break;
      case KEYCODE.ESCAPE:
        // Send cancel
        this.cancel()
        this.close(e)
        this.dispatchEvent(new FieldClickEvent(this.path() + ".cancel", this.value))
        break;
    }
  }

  private triggered(e: Event) {
    e.stopPropagation()
    this.open()
  }

  private open() {
    this.layoutController = new LayoutController(this, this._dialog)
    this.addController(this.layoutController)
    this.visible = true
    this.cancelValue = JSON.parse(JSON.stringify(this.value || {}))
    document.addEventListener('keydown', this.keyHandler)
    setTimeout(() => {
      if (this.definition) {
        this.focusField(this.path() + "." + (this.definition.focus || this.definition.fields[0].name))
      }
    }, 1)
  }

  private cancel() {
    this.value = this.cancelValue
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value))
  }
}

getLibrary("native").registerComponent("dialogSection", {
  importPath: "@formsey/fields-native/DialogSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, clickHandler, invalidHandler, id }: Resources<DialogSectionFieldDefinition, Object>) => {
    return html`<formsey-dialog-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change=${changeHandler} @input=${inputHandler} @click=${clickHandler} @invalid=${invalidHandler}></formsey-dialog-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})