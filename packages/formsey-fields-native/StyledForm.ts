import { Components, getLibrary, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { FormField } from '@formsey/core/FormField';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { FORM_STYLES } from './styles';

const themes = new Map([
  ["light", {
    style: html`<style>

    </style>`
  }],
  ["dark", {
    style: html`<style>

    </style>`
  }]
])

@customElement("formsey-styled-form")
export class StyledForm extends Form {
  static get styles() {
    return [...super.styles, FORM_STYLES, css`
    .themed {
      background-color: var(--formsey-background-color, var(--fs-background-color, inherit));
    }
  `]
  }

  @query('#form')
  form: FormField

  render() {
    let field = undefined
    if (this.definition) {
      field = createField(this.components, this.settings, this.definition, this.value, this.definition?.name, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event), 'form');
    }
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.definition?.['action'])}" method="${ifDefined(this.definition?.['method'])}" target="${ifDefined(this.definition?.['target'])}">${field}<slot></slot></form>`
    return this.settings ? html`<fs-theme theme=${ifDefined(this.settings?.['theme'])} .themes=${themes}><div class="themed">${form}</div></fs-theme>` : form
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this.attachShadow({ mode: 'open' });
  }

  protected changed(e: ValueChangedEvent<any>) {
     this.dispatchEvent(new ValueChangedEvent(e.type as  "change" | "input" | "inputChange", e.detail?.name, e.detail?.value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors));
  }
}

getLibrary("native").registerComponent("styledForm", {
  importPath: "@formsey/fields-native/StyledForm",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-styled-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form>`
  }
})