import "@vaadin/vaadin-text-field/vaadin-text-area.js";
import { html, property } from 'lit-element';
import { Field, TextFieldDefinition } from '@formsey/core';
import { ifDefined } from "lit-html/directives/if-defined";

export class TextField extends Field<TextFieldDefinition, string> {
  @property()
  value: string;

  renderField() {
    return html`<vaadin-text-area style="display:flex" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .value="${ifDefined(this.value)}"></vaadin-text-area>`;
  }
}

customElements.define('formsey-text', TextField);