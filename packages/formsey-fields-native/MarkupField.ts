import { LabeledField } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';


export class MarkupField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`<div style="width:100%;">${unsafeHTML(this.definition.default ? this.definition.default : "")}</div>`
  }
}

register({
  type: "markup",
  tag: "formsey-markup",
  constructor: MarkupField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/MarkupField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-markup id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-markup>`
  }
})