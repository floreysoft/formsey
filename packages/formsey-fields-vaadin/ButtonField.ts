import { Components, getIcon, getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { ButtonFieldDefinition, FieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidErrors } from '@formsey/core/InvalidEvent';
import { LabeledField } from '@formsey/core/LabeledField';
import { customElement, html, property, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement("formsey-button-vaadin")
export class ButtonField extends LabeledField<ButtonFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean;

  @query("button")
  button: HTMLButtonElement

  renderField() {
    const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
    return html`<vaadin-button type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}"><div slot="prefix">${icon}</div>${this.definition.text}</vaadin-button>`;
  }

  focusField(): boolean {
    this.button.focus()
    return true
  }
}

getLibrary("vaadin").registerComponent("button", {
  importPath: "@formsey/fields-vaadin/ButtonField",
    template: ( { components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<ButtonFieldDefinition, boolean> ) => {
    return html`<formsey-button-vaadin id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-button-vaadin>`
  }
})