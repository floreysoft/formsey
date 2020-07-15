import { html, property, css } from 'lit-element';
import { ImageFieldDefinition, LabeledField, register } from '@formsey/core';

export class ImageField extends LabeledField<ImageFieldDefinition, string> {
  @property({ converter: Object })
  definition: ImageFieldDefinition;

  renderField() {
    return html`<div class="if" style="text-align: ${this.definition.align}"><img src="${this.definition.url}" title="${this.definition.label}" style="width: ${this.definition.width}"></div>`
  }
}
register("formsey-image", ImageField, ["native", "material","vaadin"], "image", { importPath: "@formsey/fields-native/ImageField"})