import '@floreysoft/tabs';
import { createField, Field, LabeledField } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition, TabsFieldDefinition } from '@formsey/core/FieldDefinitions';
import { FieldFocusEvent } from '@formsey/core/FieldFocusEvent';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
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
      tabs.push(html`<fs-tab id=${this.definition.selections[i].value} label=${this.definition.selections[i].label}>${createField(this.components, this.settings, this.definition.selections[i].form, this.value?.[i], this.path(), this.errors, (event: ValueChangedEvent<string>) => this.changed(event), (event: InvalidEvent) => this.invalid(event))}</fs-tab>`)
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
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: TabsValue, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-tabs id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-tabs>`
  }
})