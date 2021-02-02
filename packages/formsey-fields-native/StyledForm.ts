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
        --formsey-font: 14px Roboto;
        --formsey-font-coarse: 15px Roboto;
        --formsey-color: #000000;
        --formsey-error-text-color: #ff3333;
        --formsey-background: #ffffff;
        --formsey-accent-color: #007dd2;
        --formsey-accent-contrast: #ffffff;
        --formsey-space-narrow: .25em;
        --formsey-space-wide: .5em;
        --formsey-border-radius: 3px;
        --formsey-border: transparent;
        --formsey-border-focus: #007fd4;
        --formsey-widget-background: #eeeeee;
        --formsey-widget-background-hover: #dddddd;
        --formsey-shade: #80808030;

        --formsey-token-invisible: #bfbfbf;
        --formsey-token-keyword: #0000FF;
        --formsey-token-constant: #06960e;
        --formsey-token-language: #0000FF;
        --formsey-token-library: #06960e;
        --formsey-token-invalid: #CD3131;
        --formsey-token-operator: #000000;
        --formsey-token-function: #3c4c72;
        --formsey-token-type: #0000FF;
        --formsey-token-string: #A31515;
        --formsey-token-comment: #008000;
        --formsey-token-tag: #800000;
        --formsey-token-numeric: #098658;
        --formsey-token-variable: #000000;
        --formsey-marker-step: #fcff00;
        --formsey-marker-stack: #a4e565;
        --formsey-marker-selection: #3a3d4111;
        --formsey-marker-selected-word: #3a3d4144;

        --formsey-elevation-1-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        --formsey-elevation-2-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        --formsey-elevation-3-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

        --formsey-elevation-0-opacity: 0%;
        --formsey-elevation-1-opacity: 5%;
        --formsey-elevation-2-opacity: 5%;
        --formsey-elevation-3-opacity: 5%;
      }
    </style>`
  }],
  ["dark", {
    style: html`<style>
      * {
        --formsey-font: 14px Roboto;
        --formsey-font-coarse: 15px Roboto;
        --formsey-color: #f5f5f5;
        --formsey-error-text-color: #ff9f9f;
        --formsey-background: #000000;
        --formsey-accent-color: #007fd4;
        --formsey-accent-contrast: #ffffff;
        --formsey-space-narrow: .25em;
        --formsey-space-wide: .5em;
        --formsey-border-radius: 3px;
        --formsey-border: transparent;
        --formsey-border-focus: #007fd4;
        --formsey-shade: #80808040;
        --formsey-widget-background: #2d2d2d;
        --formsey-widget-background-hover: #37373d;

        --formsey-token-invisible: #bfbfbf;
        --formsey-token-keyword: #569CD6;
        --formsey-token-constant: #06960e;
        --formsey-token-language: #569CD6;
        --formsey-token-library: #06960e;
        --formsey-token-invalid: #F44747;
        --formsey-token-operator: #D4D4D4;
        --formsey-token-function: #3c4c72;
        --formsey-token-type: #6d79de;
        --formsey-token-string: #ce9178;
        --formsey-token-comment: #6A9955;
        --formsey-token-tag: #569CD6;
        --formsey-token-numeric: #B5CEA8;
        --formsey-token-variable: #9cdcfe;
        --formsey-marker-step: #fcff00;
        --formsey-marker-stack: #a4e565;
        --formsey-marker-selection: #3a3d4166;
        --formsey-marker-selected-word: #3a3d41;

        --formsey-elevation-0-opacity: 0;
        --formsey-elevation-1-opacity: 10%;
        --formsey-elevation-2-opacity: 14%;
        --formsey-elevation-3-opacity: 18%;
      }
    </style>`
  }],
  ["none", {
    style: undefined
  }]
])

@customElement("formsey-styled-form")
export class StyledForm extends Form {
  static get styles() {
    return [FORM_STYLES, css`
    :host, .themed, fs-theme, form {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      max-width: 100%;
    }

    .themed {
      color: var(--formsey-color, inherit);
      background: var(--formsey-background, inherit);
    }
  `]
  }

  @query(".themed")
  themed: HTMLElement

  render() {
    let field = undefined
    if (this.definition) {
      field = createField({ id: 'form', components: this.components, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) });
    }
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.definition?.['action'])}" method="${ifDefined(this.definition?.['method'])}" target="${ifDefined(this.definition?.['target'])}">${field}<slot></slot></form>`
    return this.settings ? html`<fs-theme theme=${ifDefined(this.settings?.['theme']?.['selection'])} .themes=${themes}><div class="themed" part="form">${form}</div></fs-theme>` : form
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

  public path(): string {
    return this.parentPath
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

getLibrary("native").registerComponent("styledForm", {
  importPath: "@formsey/fields-native/StyledForm",
  factory: ({ components, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-styled-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form>`
  }
})