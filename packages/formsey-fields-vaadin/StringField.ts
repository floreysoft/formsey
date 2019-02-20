import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Field, StringFieldDefinition } from '@formsey/core';

export class StringField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  renderField() {
    return html`<vaadin-text-field style="display:flex" ?autofocus=${this.definition.focus} autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength=${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}">`;
  }
}

customElements.define('formsey-string', StringField);