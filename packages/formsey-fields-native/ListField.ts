import { LabeledField, ListFieldDefinition } from '@formsey/core';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-list")
export class ListField extends LabeledField<ListFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @query("select")
  selectBox: HTMLSelectElement

  renderField() {
    return html`
    <select class="input" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" @change="${this.changed}" @input="${this.changed}" @focus="${this.focused}" @blur="${this.blurred}" name="${this.path()}" ?disabled="${this.definition.disabled}" .value="${this.value}">
    ${this.definition.options.map(item => html`<option ?selected="${item.value ? item.value == this.value : item.label == this.value}" value="${item.value ? item.value : item.label}">${item.label ? item.label : item.value}</option>`)}
    </select>`;
  }

  focusField() {
    this.selectBox.focus()
  }

  protected changed(e: any) {
    e.stopPropagation()
    this.value = e.currentTarget.value;
    this.dispatchEvent(new ValueChangedEvent(e.type, this.path(), this.value));
  }
}

getLibrary("native").registerComponent("list", {
  importPath: "@formsey/fields-native/ListField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: string, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-list id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-list>`
  }
})