import '@vaadin/vaadin-date-picker'
import { html, property, customElement } from 'lit-element';
import { Field, DateFieldDefinition } from '@formsey/core';
import { ifDefined} from 'lit-html/directives/if-defined.js';

@customElement("formsey-date")
export class DateField extends Field<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-date-picker style="display:flex" @change="${this.valueChanged}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
    }
}