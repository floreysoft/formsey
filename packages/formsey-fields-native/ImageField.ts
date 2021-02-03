import { ImageFieldDefinition, LabeledField } from '@formsey/core';
import { Components, getLibrary, Resources, Settings } from '@formsey/core/Components';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-image")
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

getLibrary("native").registerComponent("image", {
  importPath: "@formsey/fields-native/ImageField",
  factory: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<ImageFieldDefinition, string> ) => {
    return html`<formsey-image id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-image>`
  }
})