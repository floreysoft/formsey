import { createField } from '@formsey/core/Field';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { FormField } from '@formsey/core/FormField';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, customElement, html, query } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { FORM_STYLES } from './styles';

@customElement("formsey-styled-form")
export class StyledForm extends Form {
  static get styles() {
    return [FORM_STYLES, css`
    :host, .themed, fs-theme, form {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      max-width: 100%;
      overflow: hidden;
    }

    .themed {
      color: var(--formsey-color, inherit);
      background: var(--formsey-background, inherit);
    }
  `]
  }

  @query(".themed")
  themed: HTMLElement

  @query('#field')
  form: FormField<FormDefinition, Object> | undefined

  render() {
    let field = undefined
    if (this.definition) {
      field = createField({ id: 'field', library: this.library, context: this.context, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.path(), errors: this.errors, changeHandler: (event: ValueChangedEvent<any>) => this.changed(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) });
    }
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.definition?.['action'])}" method="${ifDefined(this.definition?.['method'])}" target="${ifDefined(this.definition?.['target'])}">${field}<slot></slot></form>`
    return this.settings ? html`<div class="themed" part="form">${form}</div>` : form
  }

  updated() {
    if (this.settings) {
      const mode = this.settings?.['mode']
      this.themed.setAttribute("style", "")
      this.applyProperties(this.themed.style, this.settings?.['theme']?.['value']?.['colors']?.[mode])
      this.applyProperties(this.themed.style, this.settings?.['theme']?.['value']?.['fonts'])
      this.applyProperties(this.themed.style, this.settings?.['theme']?.['value']?.['spacing'])
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

  private applyProperties(style: CSSStyleDeclaration, properties?: Object) {
    if (properties) {
      Object.entries(properties).forEach(([key, value]) => {
        if (key.startsWith("--")) {
          style.setProperty(key, value as string);
        }
      })
    }
  }
}

getLibrary("native").registerComponent("styledForm", {
  importPath: "@formsey/fields-native/StyledForm",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-styled-form id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form>`
  }
})