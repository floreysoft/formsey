import '@vaadin/vaadin-upload/vaadin-upload.js';
import { html, property } from 'lit-element';
import { Field, DateFieldDefinition } from '@formsey/core';

export class UploadField extends Field<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-upload target="formsey-upload.storage.googleapis.com" method="PUT" timeout="300000" style="display:flex" @change="${this.valueChanged}"></vaadin-upload>`
    }
}

customElements.define('formsey-upload', UploadField);