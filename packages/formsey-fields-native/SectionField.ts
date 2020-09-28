import { Field } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class SectionField extends Field<FieldDefinition, void> {
  @property({ converter: Object })
  definition: FieldDefinition;

  renderField() {
    return html`<header>${ifDefined(this.definition.label)}</header><footer>${ifDefined(this.definition.helpText)}</footer>`
  }
}

register({
  type: "section",
  tag: "formsey-section",
  constructor: SectionField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/SectionField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-section id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-section>`
  }
})