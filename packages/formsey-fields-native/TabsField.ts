import '@floreysoft/tabs';
import { createField, Field, LabeledField } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Components';
import { FormDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class TabsValue {
  value: Object[] = []
}

@customElement("formsey-tabs")
export class TabsField extends LabeledField<TabsFieldDefinition, TabsValue> {
  @property({ converter: Object })
  value: TabsValue;

  values: string[]
  selectedValue: string
  index: number

  renderField() {
    const tabs = []
    for (let i = 0; i < this.definition.selections.length; i++) {
      tabs.push(html`<fs-tab id=${this.definition.selections[i].value} label=${this.definition.selections[i].label}>${createField({ components: this.components, settings: this.settings, definition: { type: "form", fields: this.definition.selections[i].fields } as FormDefinition, value: this.value?.[i], parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<string>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) })}</fs-tab>`)
    }
    return html`<fs-tabs>${tabs}</fs-tabs>`
  }

  public focusField(path: string) {
    if (path == this.path() + ".selection") {
      let child = this.firstElementChild.firstElementChild.nextElementSibling as Field<any, any>
      this.dispatchEvent(new FieldFocusEvent(this.path() + ".selection"));
      return (<any>child).focusField()
    }
    return false
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "change" | "input" | "inputChange", e.detail.name, this.value));
  }
}

getLibrary("native").registerComponent("tabs", {
  importPath: "@formsey/fields-native/TabsField",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<TabsFieldDefinition, TabsValue>) => {
    return html`<formsey-tabs id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-tabs>`
  }
})