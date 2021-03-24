import { createField, LabeledField } from '@formsey/core';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { ListFieldDefinition, NumberFieldDefinition, NumberUnitFieldDefinition, ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldInputEvent } from '@formsey/core/FieldInputEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-numberunit")
export class NumberUnitField extends LabeledField<NumberUnitFieldDefinition, string> {
  /* @ts-ignore */
  set value(value: string) {
    if (this.definition && typeof value === "string") {
      // Extract number and unit part
      this.definition.buttons?.forEach(button => {
        const unit = button.name
        if (unit && value.endsWith(unit)) {
          this._unit = unit
          this._value = value.substring(0, value.length - unit.length)
        }
      })
    }
  }

  get value() {
    /* @ts-ignore */
    return this._value && this._unit ? `${this._value}${this._unit}` : undefined
  }

  private _unit: string | undefined
  private _value: string | undefined

  renderField() {
    if (this.definition) {
      const number = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "number", name: "value", min: this.definition.min, max: this.definition.max, step: this.definition.step } as NumberFieldDefinition, value: this._value, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.valueChanged(event) })
      const toggle = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "toggle", name: "unit", buttons: this.definition.buttons } as ToggleFieldDefinition, value: this._unit, parentPath: this.path(), errors: this.errors, changeHandler: (event: FieldChangeEvent<any>) => this.unitChanged(event) })
      return html`<div class="nu">${number}${toggle}</div>`
    }
  }

  private valueChanged(e: CustomEvent) {
    this._value = e.detail.value
    this.dispatchEvent(new FieldInputEvent(this.path(), this.value))
  }

  private unitChanged(e: CustomEvent) {
    this._unit = e.detail.value
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value))
  }
}

getLibrary("native").registerComponent("numberUnit", {
  importPath: "@formsey/fields-native/NumberUnitField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-numberunit id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @invalid=${invalidHandler}></formsey-numberunit>`
  }
})