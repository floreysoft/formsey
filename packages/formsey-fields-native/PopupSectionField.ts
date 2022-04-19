import { createField, Field, FieldInputEvent, LabeledField } from '@formsey/core';
import { FieldChangeEvent, FieldClickEvent } from '@formsey/core/Events';
import { ButtonFieldDefinition, FormDefinition, PopupSectionFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/Events';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { LayoutController } from '@formsey/core/LayoutController';
import { getFormatter, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { Closeable } from '@formsey/core/Closeable';


@customElement("formsey-popup-section")
export class PopupSectionField extends LabeledField<PopupSectionFieldDefinition, { [key: string]: any }> implements Closeable {
  @property({ converter: Boolean })
  visible?: boolean

  @query("#form")
  form: HTMLElement | undefined

  @query("#glass")
  glass: HTMLElement | undefined

  private untouched: boolean = true
  private left: string | undefined
  private right: string | undefined
  private top: string | undefined
  private bottom: string | undefined
  private maxWidth: string | undefined
  private maxHeight: string | undefined
  private layoutController: LayoutController | undefined

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

  renderField() {
    if (this.definition) {
      const formatter = this.layoutController?.layout?.formatter ? getFormatter(this.layoutController.layout.formatter) : undefined
      const style = `left:${this.left || "auto"};right:${this.right || "auto"};top:${this.top || "auto"};bottom:${this.bottom || "auto"};position:fixed;width:${this.definition.width || "auto"};max-height:${this.maxHeight || "auto"};max-width:${this.maxWidth || "auto"};${formatter ? `${formatter.outerBoxStyle?.(this.layoutController?.layout) || ""};${formatter.innerBoxStyle?.(this.layoutController?.layout) || ""};${formatter.backgroundStyle?.(this.layoutController?.layout) || ""}` : ""}`
      return html`${createField({ id: this.elementId, library: this.library, context: this.context, settings: this.settings, definition: this.definition.trigger, parentPath: this.path(), errors: this.errors, clickHandler: this.open, invalidHandler: this.invalid })}
    ${this.visible ? html`<div id="glass" @click="${this.close}"></div>
    <div id="form" style=${style}>${createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "form", deferLayout: true, fields: this.definition.fields, layout: this.definition.layout } as FormDefinition, value: this.value, parentPath: this.path(), errors: this.errors, clickHandler: this.clicked, changeHandler: this.changed, inputHandler: this.changed, invalidHandler: this.invalid })}</div>` : undefined}`
    }
  }

  open(e: CustomEvent) {
    e.stopPropagation()
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
    this.updateComplete.then(() => {
      this.layoutController = new LayoutController(this, this.form)
      this.addController(this.layoutController)
    })
  }

  close(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    this.visible = false;
    if (this.layoutController) {
      this.removeController(this.layoutController)
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

  protected clicked(e: FieldClickEvent) {
    this.dispatchEvent(new FieldClickEvent(e.detail.name, e.detail.value, e.bubbles, this))
  }

  protected changed(e: FieldChangeEvent<any>) {
    e.stopPropagation()
    if (this.definition && e.detail?.name) {
      if (!this.definition.name) {
        // If this is an unnamed form, just pass event to parent
        this.dispatchEvent(new FieldChangeEvent(e.detail.name, e.detail.value));
      } else {
        let name = e.detail.name.substring(this.path().length + 1).split('.')[0].split('[')[0]
        if (name) {
          if (!this.value) {
            this.value = {}
          }
          this.value[name] = e.detail.value;
          this.dispatchEvent(e.type == "input" ? new FieldInputEvent(e.detail.name, this.value) : new FieldChangeEvent(e.detail.name, this.value));
        }
      }
    }
  }
}

getLibrary("native").registerComponent("popupSection", {
  importPath: "@formsey/fields-native/PopupSectionField",
  template: ({ library, context, settings, definition, value, parentPath, errors, clickHandler, changeHandler, inputHandler, invalidHandler, id }: Resources<PopupSectionFieldDefinition, Object>) => {
    return html`<formsey-popup-section id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @click=${clickHandler} @change=${changeHandler} @input=${inputHandler} @invalid=${invalidHandler}></formsey-popup-section>`
  },
  nestedFields: (definition: FormDefinition, value: any) => {
    return definition.fields
  }
})