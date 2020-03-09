import { DateFieldDefinition } from '@formsey/core';
import '@vaadin/vaadin-date-picker';
import { customElement, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { VaadinField } from './VaadinField';

@customElement("formsey-date-vaadin")
export class DateField extends VaadinField<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-date-picker style="display:flex" label="${this.definition.prompt}" ?disabled="${ifDefined(this.definition.disabled)}" ?autofocus="${this.definition.autofocus}" @change="${this.valueChanged}" min="${ifDefined(this.definition.min)}"  max="${ifDefined(this.definition.max)}" step="${ifDefined(this.definition.step)}" .value=${this.value} placeholder="${ifDefined(this.definition.placeholder)}"></vaadin-date-picker>`
    }
}