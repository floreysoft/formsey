import { DateFieldDefinition, LabeledField } from '@formsey/core';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import { customElement, html, property } from 'lit-element';

@customElement("formsey-upload-vaadin")
export class UploadField extends LabeledField<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-upload target="formsey-upload.storage.googleapis.com" method="PUT" timeout="300000" style="display:flex" @change="${this.valueChanged}"></vaadin-upload>`
    }
}

customElements.define('', UploadField);