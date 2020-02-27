import { DateFieldDefinition, LabeledField } from '@formsey/core';
import '@vaadin/vaadin-date-picker';
import { customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement("formsey-date-vaadin")
export class DateField extends LabeledField<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-date-picker style="display:flex" @change="${this.valueChanged}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
    }
}