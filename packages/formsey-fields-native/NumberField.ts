import { NumberFieldDefinition, ValueChangedEvent } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
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
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-number id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number>`
  }
})