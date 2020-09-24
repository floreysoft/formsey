import { Field, FieldDefinition, register } from '@formsey/core';
import { html } from "lit-element";
import { property } from "lit-element/lib/decorators.js";
import { ifDefined } from 'lit-html/directives/if-defined';

export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`<header>${ifDefined(this.definition.label)}</header><footer>${ifDefined(this.definition.helpText)}</footer>`
  }
}
register("formsey-section", SectionField, ["native", "vaadin"], "section", { importPath: "@formsey/fields-native/SectionField"})