import { DateFieldDefinition, LabeledField, register } from '@formsey/core';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import { html, property } from 'lit-element';

export class UploadField extends LabeledField<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-upload target="formsey-upload.storage.googleapis.com" method="PUT" timeout="300000" style="display:flex" @change="${this.changed}"></vaadin-upload>`
    }
}

register("formsey-upload-vaadin", UploadField, ["material","vaadin"], "upload", "@formsey/fields-vaadin/UploadField")
