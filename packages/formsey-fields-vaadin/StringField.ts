import { StringFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { html } from "lit";
import { customElement, property } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { InputField } from './InputField';

@customElement("formsey-string-vaadin")
export class StringField extends InputField<StringFieldDefinition, string> {
  protected get type() : "text" | "search" | "tel" | "url" | "email" | "password" | "time" | "datetime-local" | "week" | "month" | "color" {
    return "text"
  }

  @property({ type: String })
  value: string;

  renderField(customValidity: string) {
    return html`<vaadin-text-field style="display:flex" label="${ifDefined(this.definition.label)}" .helperText="${this.definition.helpText as string}" ?readonly="${this.definition.readonly}" ?autoselect="${this.definition.autoselect}" ?autofocus="${this.definition.autofocus}" ?required="${this.definition.required}" autocomplete="${ifDefined(this.definition.autocomplete)}" @input="${this.inputted}" @changed="${this.changed}"  name="${this.definition.name}" placeholder="${ifDefined(this.definition.placeholder)}" error-message="${ifDefined(customValidity)}" maxlength="${ifDefined(this.definition.maxlength)}" ?disabled="${this.definition.disabled}" pattern="${ifDefined(this.definition.pattern)}" preventinvalidinput="true" .value="${this.value ? this.value : ''}">`;
  }

  firstUpdated() {
    (this.vaadinField.focusElement as any).type = this.type
  }
}

getLibrary("vaadin").registerComponent("string", {
  importPath: "@formsey/fields-vaadin/StringField",
    template: ( { library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id } : Resources<StringFieldDefinition, string> ) => {
    return html`<formsey-string-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-string-vaadin>`
  }
})