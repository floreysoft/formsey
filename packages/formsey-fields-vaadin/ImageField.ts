import { customElement, html, property } from 'lit-element';
import { Field, ImageFieldDefinition } from '@formsey/core';

@customElement("formsey-image")
export class ImageField extends Field<ImageFieldDefinition, string> {
  @property({ converter: Object })
  definition: ImageFieldDefinition;

  renderStyles() {
    return `
    div {
      width: 100%;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    `
  }

  renderField() {
    return html`<div style="text-align: ${this.definition.align}"><img src="${this.definition.url}" title="${this.definition.prompt}" style="width: ${this.definition.width}"></div>`
  }
}