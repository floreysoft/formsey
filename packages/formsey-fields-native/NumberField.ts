import { FieldChangeEvent, FieldInputEvent, NumberFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';


@customElement("formsey-number")
export class NumberField extends InputField<NumberFieldDefinition, number> {

  protected changed(e: any) {
    e.stopPropagation()
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  protected inputted(e: any) {
    e.stopPropagation()
    this.value = +e.currentTarget.value;
    this.dispatchEvent(new FieldInputEvent(this.path(), this.value));
  }

  protected get type() : "number" | "range" {
    return "number"
  }
}

getLibrary("native").registerComponent("number", {
  importPath: "@formsey/fields-native/NumberField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<NumberFieldDefinition, number>) => {
    return html`<formsey-number id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-number>`
  }
})