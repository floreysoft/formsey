import { NumberFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { customElement, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-number")
export class NumberField extends InputField<NumberFieldDefinition, number> {

  protected changed(e: any) {
    e.stopPropagation()
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent("change", this.path(), this.value));
  }

  protected inputted(e: any) {
    e.stopPropagation()
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value));
  }

  protected get type() : "number" | "range" {
    return "number"
  }
}

getLibrary("native").registerComponent("number", {
  importPath: "@formsey/fields-native/NumberField",
    factory: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, number>) => {
    return html`<formsey-number id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number>`
  }
})