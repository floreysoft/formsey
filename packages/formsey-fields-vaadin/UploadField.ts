import { DateFieldDefinition, LabeledField, registerComponent } from '@formsey/core';
import { Components, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import '@vaadin/vaadin-upload/vaadin-upload.js';
import { html } from "lit-element";
import { property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class UploadField extends LabeledField<DateFieldDefinition, string> {
    @property({ type: String })
    value: string;

    renderField() {
        return html`<vaadin-upload target="formsey-upload.storage.googleapis.com" method="PUT" timeout="300000" style="display:flex" @change="${this.changed}"></vaadin-upload>`
    }
}

registerComponent({
    type: "upload",
    tag: "formsey-upload-vaadin",
    constructor: UploadField,
    libraries: ["vaadin" ],
    importPath: "@formsey/fields-vaadin/UploadField",
    factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
      return html`<formsey-upload-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-upload-vaadin>`
    }
  })