import { createField } from '@formsey/core/Field';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { adoptStyles, css, html, ReactiveElement } from "lit";
import { customElement, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';
import { FORM_STYLES } from './styles';


@customElement("formsey-styled-form-vaadin")
export class StyledForm extends Form {
  @query(".themed")
  themed: HTMLElement

  static get styles() {
    return [FORM_STYLES, css`
      .themed {
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
      }
    `]
  }

  render() {
    let field = undefined
    if (this.definition) {
      field = createField({ id: 'form', library: this.library, context: this.context, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.definition?.name, errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) });
    }
    const form = html`
    <custom-style>
      <style include="lumo-color lumo-typography"></style>
    </custom-style>
    <slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.action)}" method="${ifDefined(this.method)}" target="${ifDefined(this.target)}">${field}<slot></slot></form>`
    return this.settings ? html`<div class="themed" theme="${ifDefined(this.settings['theme'])}">${form}</div>` : form
  }

  protected createRenderRoot(): Element | ShadowRoot {
    const renderRoot = this.shadowRoot ?? this.attachShadow((this.constructor as typeof ReactiveElement).shadowRootOptions);
    adoptStyles(renderRoot, (this.constructor as typeof ReactiveElement).elementStyles!);
    return renderRoot;
  }

  updated() {
    if (this.settings) {
      const theme = this.settings['theme']
      document.querySelector('html').setAttribute('theme', theme)
      const properties = this.settings[theme]
      if (properties) {
        this.themed.setAttribute("style", "")
        Object.entries(properties).forEach(([key, value]) => {
          this.themed.style.setProperty(key, value as string);
        })
      }
    }
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "change" | "input" | "inputChange", e.detail.name, e.detail.value));
  }

  protected invalid(e: InvalidEvent) {
    this.dispatchEvent(new InvalidEvent(e.detail));
  }
}

getLibrary("vaadin").registerComponent("styledForm", {
  importPath: "@formsey/fields-vaadin/StyledForm",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-styled-form-vaadin id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form-vaadin>`
  }
})