import { html, property, customElement, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Field, StringFieldDefinition } from '@formsey/core';
import { VaadinTextField } from '@vaadin/vaadin-text-field'
import { InvalidEvent } from '@formsey/core/InvalidEvent';

@customElement("formsey-string")
export class StringField extends Field<StringFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("vaadin-text-field")
  vaadinTextField : VaadinTextField

  renderField() {
    return html`<vaadin-text-field style="display:flex" ?autofocus="${this.definition.focus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autofill)}" @input="${this.valueChanged}" name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" .maxlength="${ifDefined(this.definition.maxlength)}" .value="${ifDefined(this.value)}">`;
  }

  checkValidity() {
    if ( !this.vaadinTextField.checkValidity() ) {
      this.invalid(new InvalidEvent(this.definition.name, undefined))
      return false;
    }
    return true;
  }
}