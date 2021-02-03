import { getLibrary, Resources } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { FORM_STYLES } from './styles';

const themes = new Map([
  ["light", {
    style: html`<style>
      * {
        --mdc-theme-primary: #6200ee;
        --mdc-theme-secondary: #018786;
        --mdc-theme-surface: #ffffff;
        --mdc-theme-background: #ffffff;
        --mdc-theme-on-primary: #ffffff;
        --mdc-theme-on-secondary: #ffffff;
        --mdc-theme-on-surface: #000000;
        --mdc-theme-text-primary-on-background: #000000;
      }
    </style>`
  }],
  ["dark", {
    style: html`<style>
      * {
        --mdc-theme-primary: #6200ee;
        --mdc-theme-secondary: #018786;
        --mdc-theme-surface: #333333;
        --mdc-theme-background: #000000;
        --mdc-theme-on-primary: #ffffff;
        --mdc-theme-on-secondary: #ffffff;
        --mdc-theme-on-surface: #ffffff;
        --mdc-theme-text-primary-on-background: #ffffff;
        --mdc-text-field-fill-color: #99999930;
      }
    </style>`
  }],
  ["none", {
    style: undefined
  }]
])

@customElement("formsey-styled-form-material")
export class StyledForm extends Form {
  static get styles() {
    return [FORM_STYLES, css`
    .themed {
      color: var(--mdc-theme-text-primary-on-background, inherit);
      background: var(--mdc-theme-background, inherit);
    }
  `]
  }

  @query(".themed")
  themed: HTMLElement

  render() {
    let field = undefined
    if (this.definition) {
      field = createField({ id: 'form', components: this.components, context: this.context, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.definition?.name, errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) });
    }
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.definition?.['action'])}" method="${ifDefined(this.definition?.['method'])}" target="${ifDefined(this.definition?.['target'])}">${field}<slot></slot></form>`
    return this.settings ? html`<fs-theme theme=${ifDefined(this.settings?.['theme']?.['selection'])} .themes=${themes}><div class="themed">${form}</div></fs-theme>` : form
  }

  updated() {
    if (this.settings) {
      const theme = this.settings?.['theme']?.['selection']
      this.themed.setAttribute("style", "")
      if (theme == "custom") {
        const properties = this.settings?.['theme']?.['value']
        if (properties) {
          Object.entries(properties).forEach(([key, value]) => {
            this.themed.style.setProperty(key, value as string);
          })
        }
      }
    }
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this.attachShadow({ mode: 'open' });
  }

  protected changed(e: ValueChangedEvent<any>) {
    this.dispatchEvent(new ValueChangedEvent(e.type as "change" | "input" | "inputChange", e.detail?.name, e.detail?.value));
  }

  protected invalid(e: InvalidEvent) {
    this.dispatchEvent(new InvalidEvent(e.detail));
  }
}

getLibrary("material").registerComponent("styledForm", {
  importPath: "@formsey/fields-material/StyledForm",
  factory: ({ components, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-styled-form-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form-material>`
  }
})