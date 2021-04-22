import { ButtonFieldDefinition } from '@formsey/core/FieldDefinitions';
import { LabeledField } from '@formsey/core/LabeledField';
import { getIcon, getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';


@customElement("formsey-button-vaadin")
export class ButtonField extends LabeledField<ButtonFieldDefinition, void> {
  @query("button")
  button: HTMLButtonElement | undefined

  renderField() {
    if (this.definition) {
      const icon = typeof this.definition.icon == "string" ? getIcon(this.definition.icon) : this.definition.icon
      return html`<vaadin-button type="${ifDefined(this.definition.buttonType)}" @click="${this.clicked}" @focus="${this.focused}" @blur="${this.blurred}" ?disabled="${this.definition.disabled}"><div slot="prefix">${icon}</div>${this.definition.text}</vaadin-button>`;
    }
  }

  focusField(): boolean {
    this.button?.focus()
    return true
  }
}

getLibrary("vaadin").registerComponent("button", {
  importPath: "@formsey/fields-vaadin/ButtonField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<ButtonFieldDefinition, boolean>) => {
    return html`<formsey-button-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-button-vaadin>`
  }
})