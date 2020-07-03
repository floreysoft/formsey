import { Field, FieldDefinition, register } from '@formsey/core';
import { html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`<header>${ifDefined(this.definition.label)}</header><footer>${ifDefined(this.definition.helpText)}</footer>`
  }
}
register("formsey-section", SectionField, ["native", "vaadin"], "section", "@formsey/fields-native/SectionField")