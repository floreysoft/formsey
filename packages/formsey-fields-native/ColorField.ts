import { html, css, query } from 'lit-element';
import { StringField } from './StringField';
import { register, StringFieldDefinition, ChangeEvent } from '@formsey/core';
import { ifDefined } from 'lit-html/directives/if-defined.js';

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
    }

    #picker {
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid var(--formsey-input-border-color, #d5d5d5);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
      float: left;
    }
    #picker:focus-within {
      border: 1px solid var(--formsey-input-focus-border-color, #a0a0a0);
    }
    `]
  }

  protected renderField() {
    return html`<div id="layout">${super.renderField()}<div id="picker" style="background-color:${ifDefined(this.value)}"><input type="color" value="${this.value ? this.value : "#ff0000"}" @input="${this.changed}"></div></div>`
  }

  protected get type(): string {
    return "text"
  }

}
register("formsey-color", ColorField)