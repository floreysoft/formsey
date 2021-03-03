import { ImageFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


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
  template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<ImageFieldDefinition, string> ) => {
    return html`<formsey-image id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-image>`
  }
})