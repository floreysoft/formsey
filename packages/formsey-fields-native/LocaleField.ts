import { createField, LabeledField, ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { FieldDefinition, ListFieldDefinition } from '@formsey/core/FieldDefinitions';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
const locales = ["af", "ar-dz", "ar-kw", "ar-ly", "ar-ma", "ar-sa", "ar-tn", "ar", "az", "be", "bg", "bn-bd", "bn", "br", "bs", "ca", "cs", "cy", "da", "de-at", "de-ch", "de", "el", "en-au", "en-ca", "en-gb", "en-ie", "en-il", "en-in", "en-nz", "en-sg", "eo", "es-do", "es-mx", "es-us", "es", "et", "eu", "fa", "fi", "fil", "fo", "fr-ca", "fr-ch", "fr", "fy", "gd", "gl", "gu", "he", "hi", "hr", "hu", "hy-am", "id", "is", "it-ch", "it", "ja", "jv", "ka", "kk", "km", "kn", "ko", "ku", "ky", "lb", "lo", "lt", "lv", "mi", "mk", "ml", "mn", "mr", "ms-my", "ms", "mt", "my", "nb", "ne", "nl-be", "nl", "nn", "pa-in", "pl", "pt-br", "pt", "ro", "ru", "sd", "si", "sk", "sl", "sq", "sr-cyrl", "sr", "sv", "sw", "ta", "te", "tg", "th", "tk", "tl-ph", "tr", "ug-cn", "uk", "ur", "uz-latn", "uz", "vi", "yo", "zh-cn", "zh-hk", "zh-mo", "zh-tw"]

// @ts-ignore
const languageNames = new Intl.DisplayNames(navigator.languages, { type: 'language' })

const options = locales.map(locale => {
  return { "label": `${languageNames.of(locale)}`, "value": locale }
})
options.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))

@customElement("formsey-locale")
export class LocaleField extends LabeledField<FieldDefinition, string> {
  protected renderField() {
    return createField({ components: this.components, context: this.context, settings: this.settings, definition: { type: "select", name: this.definition.name, searchThreshold: 10, options } as ListFieldDefinition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (e: CustomEvent) => this.changed(e) })
  }

  protected changed(e: CustomEvent) {
    this.value = e.detail.value
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.path(), this.value));
  }
}

getLibrary("native").registerComponent("locale", {
  importPath: "@formsey/fields-native/LocaleField",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FieldDefinition, string>) => {
    return html`<formsey-locale id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-locale>`
  }
})