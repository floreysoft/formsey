import { ImageFieldDefinition, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-image")
export class ImageField extends LabeledField<ImageFieldDefinition, string> {
  @query("img")
  img: HTMLImageElement | undefined

  errorOccured = false;

  renderField() {
    if (this.definition) {
      return html`<div class="if" style="text-align: ${this.definition.align}"><img src="${this.definition.url}" title="${ifDefined(this.definition.label)}" @error="${this.loaderror}" style="width: ${this.definition.width}"></div>`
    }
  }

  loaderror(e: Event) {
    if (!this.errorOccured && this.img) {
      this.errorOccured = true;
      this.img.src = "//formsey.com/assets/images/formsey.png";
      this.img.style.maxHeight = "100px";
      this.img.style.maxWidth = "100px";
    }
  }
}

getLibrary("native").registerComponent("image", {
  importPath: "@formsey/fields-native/ImageField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ImageFieldDefinition, string>) => {
    return html`<formsey-image id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @invalid=${invalidHandler}></formsey-image>`
  }
})