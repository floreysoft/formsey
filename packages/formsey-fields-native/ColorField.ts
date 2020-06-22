import { register } from '@formsey/core';
import { css, html, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ICON_COLOR_FIELD } from '.';
import { StringField } from './StringField';
import { INPUT_STYLE } from './styles';

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
register("formsey-color", ColorField)