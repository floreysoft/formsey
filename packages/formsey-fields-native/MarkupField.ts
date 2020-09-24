import { FieldDefinition, LabeledField, register } from '@formsey/core';
import { html } from "lit-element";
import { property } from "lit-element/lib/decorators.js";
import { unsafeHTML } from 'lit-html/directives/unsafe-html';


export class MarkupField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`<div style="width:100%;">${unsafeHTML(this.definition.default ? this.definition.default : "")}</div>`
  }
}
register("formsey-markup", MarkupField, ["native", "vaadin", "material"], "markup", { importPath: "@formsey/fields-native/MarkupField", focusable : false})