import { Field } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/FieldChangeEvent';
import { CheckboxFieldDefinition } from '@formsey/core/FieldDefinitions';
import { InvalidError, InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { CheckboxElement } from "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


@customElement("formsey-checkbox-vaadin")
export class CheckboxField extends Field<CheckboxFieldDefinition, boolean> {
  @property({ type: Boolean })
  value: boolean | undefined

  @query("vaadin-checkbox")
  private vaadinCheckbox: CheckboxElement | undefined

  static get styles() {
    return [css`
    vaadin-checkbox {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }`]
  }

  render() {
    if (this.definition) {
      let customValidity = this.definition.customValidity
      const error = this.errors?.get(this.path())
      if (error?.validityMessage) {
        customValidity = error?.validityMessage
      }
      return this.definition.label || this.definition.helpText ? html`<vaadin-checkbox-group label="${ifDefined(this.definition.label as string)}" .helperText="${this.definition.helpText as string}" theme="vertical"><vaadin-checkbox @change=${this.changed} ?disabled="${this.definition.disabled}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" .indeterminate="${!!this.definition.indeterminate}" .checked=${!!this.value} value="${!!this.definition.name}">${this.definition.controlLabel || ""}</vaadin-checkbox></vaadin-checkbox-group>` :
        html`<vaadin-checkbox @change=${this.changed} ?disabled="${this.definition.disabled}" ?required="${this.definition.required}" error-message="${ifDefined(customValidity)}" .indeterminate="${!!this.definition.indeterminate}" .checked=${!!this.value} value="${!!this.definition.name}">${this.definition.controlLabel || ""}</vaadin-checkbox>`;
    }
  }

  protected changed(e: Event) {
    e.stopPropagation()
    this.value = this.vaadinCheckbox?.checked;
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  focusField(path: string) {
    if (path == this.definition?.name) {
      this.vaadinCheckbox?.focus()
    }
  }
  validate(report: boolean) {
    this.valid = !(!this.vaadinCheckbox?.checked && this.definition?.required)
    if (!this.valid) {
      this.invalid()
    }
    return this.valid
  }

  invalid() {
    if (this.definition?.name) {
      this.errors = this.errors || new InvalidErrors()
      this.errors.set(this.definition.name, new InvalidError("Please check", false, {}))
      this.dispatchEvent(new InvalidEvent(this.errors))
    }
  }
}

getLibrary("vaadin").registerComponent("checkbox", {
  importPath: "@formsey/fields-vaadin/CheckboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-checkbox-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-checkbox-vaadin>`
  }
})

getLibrary("vaadin").registerComponent("switch", {
  importPath: "@formsey/fields-vaadin/CheckboxField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<CheckboxFieldDefinition, boolean>) => {
    return html`<formsey-checkbox-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-checkbox-vaadin>`
  }
})