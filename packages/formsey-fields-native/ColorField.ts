import { register } from '@formsey/core';
import { css, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ICON_COLOR_FIELD } from '.';
import { StringField } from './StringField';
import { INPUT_STYLE } from './styles';

export class ColorField extends StringField {
  static get styles() {
    return [...super.styles, INPUT_STYLE, css`
    #layout {
      position: relative;
      width: 100%;
    }

    input[type="text"] {
      text-transform: uppercase;
    }

    input[type="color"] {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 1.8em;
      height: 1.8em;
      border: none;
      padding: 0 1px;
    }

    #picker {
      position: absolute;
      top: 0;
      right: 0;
      margin: .4em;
      width: 1.2em;
      height: 1.2em;
      border-radius: 50%;
    }

    svg {
      width: 1.2em;
      height: 1.2em;
     }
    `]
  }

  protected renderField() {
    this.definition.maxlength = 9
    return html`<div id="layout">${super.renderField()}<div id="picker" style="background-color:${ifDefined(this.value)}">${!this.value ? ICON_COLOR_FIELD : undefined}<input type="color" value="${this.value ? this.value : "#ff0000"}" @input="${this.changed}" tabindex="-1"></div></div>`
  }

  protected get type(): string {
    return "text"
  }

}
register("formsey-color", ColorField)