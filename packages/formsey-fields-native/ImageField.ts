import { html, property, query } from 'lit-element';
import { ImageFieldDefinition, LabeledField, register } from '@formsey/core';

export class ImageField extends LabeledField<ImageFieldDefinition, string> {
  @property({ converter: Object })
  definition: ImageFieldDefinition;

  @query("img")
  img: HTMLImageElement

  errorOccured = false;

  renderField() {
    return html`<div class="if" style="text-align: ${this.definition.align}"><img src="${this.definition.url}" title="${this.definition.label}" @error="${this.loaderror}" style="width: ${this.definition.width}"></div>`
  }

  loaderror(e : Event) {
    if (!this.errorOccured) {
      this.errorOccured = true;
      this.img.src = "//formsey.com/assets/images/formsey.png";
      this.img.style.maxHeight = "100px";
      this.img.style.maxWidth = "100px";
    }
  }
}
register("formsey-image", ImageField, ["native", "material","vaadin"], "image", { importPath: "@formsey/fields-native/ImageField"})