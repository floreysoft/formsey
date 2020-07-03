import { register } from '@formsey/core';
import { css, html, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { StringField } from './StringField';
import { INPUT_STYLE } from './styles';

export const ICON_COLOR_FIELD = html`<svg viewBox="2 2 20 20"><title>Color</title><path d="M17.484 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM14.484 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM9.516 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM6.516 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM12 3q3.703 0 6.352 2.344t2.648 5.672q0 2.063-1.477 3.516t-3.539 1.453h-1.734q-.656 0-1.078.445t-.422 1.055q0 .516.375 .984t.375 1.031q0 .656-.422 1.078t-1.078.422q-3.75 0-6.375-2.625t-2.625-6.375 2.625-6.375 6.375-2.625z"></path></svg>`

export class ColorField extends StringField {
  @query("input[type='color']")
  color: HTMLInputElement

  protected renderField() {
    this.definition.maxlength = 9
    return html`<div class="cf" @keydown="${this.keyDown}">${super.renderField()}<div class="cfp" style="background-color:${ifDefined(this.value)}">${!this.value ? ICON_COLOR_FIELD : undefined}<input type="color" value="${this.value ? this.value : "#ff0000"}" @input="${this.changed}" tabindex="-1"></div></div>`
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
}
register("formsey-color", ColorField, "native", "color", "@formsey/fields-native/ColorField")