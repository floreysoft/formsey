import { ImageFieldDefinition, LabeledField } from '@formsey/core';
import { Components, register, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { html } from "lit-element";
import { property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';



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

register({
  type: "image",
  tag: "formsey-image",
  constructor: ImageField,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/ImageField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-image id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-image>`
  }
})