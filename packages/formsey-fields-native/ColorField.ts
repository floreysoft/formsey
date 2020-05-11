import { html, css, query } from 'lit-element';
import { StringField } from './StringField';
import { register, StringFieldDefinition, ChangeEvent } from '@formsey/core';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export const ICON_COLOR_FIELD = html`<svg viewBox="2 2 20 20"><title>Color</title><path d="M17.484 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM14.484 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM9.516 8.016q.609 0 1.055-.445t.445-1.055-.445-1.055-1.055-.445-1.055.445-.445 1.055.445 1.055 1.055.445zM6.516 12q.609 0 1.055-.422t.445-1.078-.445-1.078-1.055-.422-1.055.422-.445 1.078.445 1.078 1.055.422zM12 3q3.703 0 6.352 2.344t2.648 5.672q0 2.063-1.477 3.516t-3.539 1.453h-1.734q-.656 0-1.078.445t-.422 1.055q0 .516.375 .984t.375 1.031q0 .656-.422 1.078t-1.078.422q-3.75 0-6.375-2.625t-2.625-6.375 2.625-6.375 6.375-2.625z"></path></svg>`

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