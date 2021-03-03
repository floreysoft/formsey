import { createField, LabeledField } from '@formsey/core';
import { ListFieldDefinition, NumberFieldDefinition, NumberUnitFieldDefinition, ToggleFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit";
import { customElement } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-numberunit")
export class NumberUnitField extends LabeledField<NumberUnitFieldDefinition, string> {
  /* @ts-ignore */
  set value(value: string) {
    if (typeof value === "string") {
      // Extract number and unit part
      this.definition.buttons?.forEach(button => {
        const unit = button.name
        if (value.endsWith(unit)) {
          this._unit = unit
          this._value = value.substring(0, value.length - unit.length)
        }
      })
    }
  }

  get value() {
    return this._value && this._unit ? `${this._value}${this._unit}` : undefined
  }

  private _unit: string
  private _value: string

  renderField() {
    const number = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "number", name: "value", min: this.definition.min, max: this.definition.max, step: this.definition.step } as NumberFieldDefinition, value: this._value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.valueChanged(event) })
    const toggle = createField({ library: this.library, context: this.context, settings: this.settings, definition: { type: "toggle", name: "unit", buttons: this.definition.buttons } as ToggleFieldDefinition, value: this._unit, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.unitChanged(event) })
    return html`<div class="nu">${number}${toggle}</div>`
  }

  private valueChanged(e: CustomEvent) {
    this._value = e.detail.value
    this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value))
  }

  private unitChanged(e: CustomEvent) {
    this._unit = e.detail.value
    this.dispatchEvent(new ValueChangedEvent("input", this.path(), this.value))
  }
}

getLibrary("native").registerComponent("numberUnit", {
  importPath: "@formsey/fields-native/NumberUnitField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<ListFieldDefinition, string>) => {
    return html`<formsey-numberunit id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-numberunit>`
  }
})