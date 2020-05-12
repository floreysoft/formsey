import { register } from '@formsey/core';
import { css, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { StringField } from './StringField';
import { ICON_COLOR_FIELD } from '.';

export class ColorField extends StringField {
  static get styles() {
    return [...super.styles, css`
    #layout {
      display: inline-grid;
      width: 100%;
      grid-template-columns: 1fr 32px;
    }

    input[type="text"] {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      text-transform: uppercase;
    }

    input[type="color"] {
      opacity: 0;
      display: block;
      width: 32px;
      height: 32px;
      border: none;
      padding: 0 1px;
    }

    #picker {
      position: relative;
      background: var(--formsey-input-background, #99999920);
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid transparent;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      float: left;
    }
    #picker:focus-within {
      border: 1px solid var(--formsey-primary-color,  #020b2f);
    }

    svg {
      position: absolute;
      width: 1em;
      height: auto;
      top: 5px;
      left: 5px;
      padding: 3px;
      background-color: #ffffff;
      border-radius: 50%;
    }
    `]
  }

  protected renderField() {
    return html`<div id="layout">${super.renderField()}<div id="picker" style="background-color:${ifDefined(this.value)}">${ICON_COLOR_FIELD}<input type="color" value="${this.value ? this.value : "#ff0000"}" @input="${this.changed}"></div></div>`
  }

  protected get type(): string {
    return "text"
  }

}
register("formsey-color", ColorField)