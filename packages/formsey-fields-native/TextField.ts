import { KEYCODE } from '@floreysoft/utils';
import { LabeledField, StringFieldDefinition, TextFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("formsey-text")
export class TextField extends LabeledField<TextFieldDefinition, string> {
  @property({ type: String })
  value: string = ""

  @query("textarea")
  textArea: HTMLTextAreaElement | undefined

  protected formResetCallback() {
    this.value = '';
  }

  protected renderField() {
    if (this.definition) {
      return html`<textarea class="input" rows="3" ?autofocus=${this.definition.autofocus} ?disabled=${this.definition.disabled} ?required="${this.definition.required}" draggable="true"
    @dragstart="${(e: DragEvent) => { e.preventDefault(); e.stopPropagation() }}" @keydown="${this.keyDown}" @input="${this.inputted}" @change="${this.changed}" @blur="${this.blurred}" @focus="${this.focused}" @invalid="${this.invalid}" name="${ifDefined(this.definition.name)}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}" .value="${this.value || ''}"></textarea>`
    }
  }

  focusField() {
    this.textArea?.focus()
    return true
  }

  validate(report: boolean) {
    this.textArea?.setCustomValidity("")
    return this.textArea?.checkValidity() as boolean
  }

  invalid() {
    if (this.textArea && this.definition) {
      let validityState: { [key: string]: any } = {}
      for (let key in this.textArea.validity) {
        if ((<any>this.textArea.validity)[key]) {
          validityState[key] = (<any>this.textArea.validity)[key]
        }
      }
      if (this.definition.customValidity && !this.textArea.validity.valid) {
        this.textArea.setCustomValidity(this.definition.customValidity)
      }
      this.errors = this.errors || new InvalidErrors()
      this.errors.set(this.path(), new InvalidError(this.textArea.validationMessage, false, validityState))
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }

  keyDown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case KEYCODE.RETURN:
      case KEYCODE.LEFT:
      case KEYCODE.RIGHT:
        e.stopPropagation()
    }
  }
}

getLibrary("native").registerComponent("text", {
  importPath: "@formsey/fields-native/TextField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<StringFieldDefinition, string>) => {
    return html`<formsey-text id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-text>`
  }
})