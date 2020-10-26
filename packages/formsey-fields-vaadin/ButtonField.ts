import { ButtonFieldDefinition } from '@formsey/core/FieldDefinitions';
import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { VaadinField } from './VaadinField';

@customElement("formsey-button-vaadin")
export class ButtonField extends VaadinField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
  return html`<vaadin-button type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}">${this.definition.text}</vaadin-button>`;
  }

  focusField() : boolean {
    this.button.focus()
    return true
  }
}

getLibrary("vaadin").registerComponent("button", {
  importPath: "@formsey/fields-vaadin/ButtonField",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: boolean, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-button-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-button-vaadin>`
  }
})