import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { StringField } from './StringField';

export const ICON_COLOR_FIELD = html`<svg viewBox="2 2 20 20"><title>Color</title><path d="M17.484 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM14.484 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM9.516 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM6.516 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM12 3q3.703 0 6.352 2.344t2.648 5.672q0 2.063-1.477 3.516t-3.539 1.453h-1.734q-.656 0-1.078.445t-.422 1.055q0 .516.375 .984t.375 1.031q0 .656-.422 1.078t-1.078.422q-3.75 0-6.375-2.625t-2.625-6.375 2.625-6.375 6.375-2.625z"></path></svg>`

@customElement("formsey-color-vaadin")
export class ColorField extends StringField {
  @query("input[type='color']")
  color: HTMLInputElement

  render() {
    let customValidity = this.definition.customValidity
    if ( this.error && this.error.validityMessage ) {
      customValidity = this.error.validityMessage
    }
    const style = this.value ? "background-color:"+this.value : undefined
    return html`<div class="cf" @keydown="${this.keyDown}">
    <vaadin-text-field style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText}" ?readonly="${this.definition.readonly}" ?autoselect="${this.definition.autoselect}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @changed="${this.changed}"  name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="7" ?disabled="${this.definition.disabled}" .value="${this.value ? this.value : ''}">
    <div slot="suffix" class="${this.value ? 'cfp cfps' : 'cfp'}" style="${ifDefined(style)}">${!this.value ? ICON_COLOR_FIELD : undefined}<input type="color" value="${this.value ? this.value : '#ff0000'}" @input="${this.changed}" tabindex="-1"></div></vaadin-text-field></div>`
  }

  protected get type(): "text" {
    return "text"
  }

  private keyDown(e: KeyboardEvent) {
    if ( e.keyCode == 13 ) {
      e.stopPropagation()
      this.color.click()
    }
  }

  protected changed(e: any) {
    super.changed(e)
    this.vaadinTextField.value = this.value
  }
}

getLibrary("vaadin").registerComponent("color", {
  importPath: "@formsey/fields-vaadin/ColorField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-color-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-color-vaadin>`
  }
})