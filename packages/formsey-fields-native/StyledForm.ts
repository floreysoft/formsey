import { createField } from '@formsey/core/Field';
import { FieldChangeEvent } from '@formsey/core/Events';
import { FormDefinition } from '@formsey/core/FieldDefinitions';
import { FieldInputEvent } from '@formsey/core/Events';
import { Form } from '@formsey/core/Form';
import { FormField } from '@formsey/core/FormField';
import { InvalidEvent } from '@formsey/core/InvalidEvent';
import { Theme } from '@floreysoft/theme';
import { getLibrary, Resources, Settings } from '@formsey/core/Registry';
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { FORM_STYLES } from './styles';

@customElement("formsey-styled-form")
export class StyledForm extends Form {
  static shadowDom = true

  static get styles() {
    return [FORM_STYLES, css`
    :host, .themed, form {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      max-width: 100%;
      overflow: hidden;
    }

    .themed {
      color: var(--formsey-color, inherit);
      background: var(--styled-form-background, var(--formsey-background, inherit));
    }
  `]
  }

  // @ts-ignore
  set settings(settings: Settings) {
    if (settings != this._settings) {
      this._settings = settings
      this.themes = new Map([["light", {
        style: html`<style>* {${this.constructStyle(settings, "light")}}</style>`
      }],
      ["dark", {
        style: html`<style>* {${this.constructStyle(settings, "dark")}}</style>`
      }]]);
      const webFont = settings?.['fonts']?.['loadWebfont']?.['url']
      if (webFont) {
        let hash = 0, i, chr;
        for (i = 0; i < webFont.length; i++) {
          chr = webFont.charCodeAt(i);
          hash = ((hash << 5) - hash) + chr;
          hash |= 0;
        }
        let fontElement = window.document.getElementById("" + hash)
        if (!fontElement) {
          let link = document.createElement("link")
          link.setAttribute("id", "" + hash)
          link.setAttribute("rel", "stylesheet")
          link.setAttribute("type", "text/css")
          link.setAttribute("href", webFont)
          window.document.getElementsByTagName("head")[0].appendChild(link)
        }
      }
      this.requestUpdate()
    }
  }

  get settings() {
    // @ts-ignore
    return this._settings
  }

  @property()
  mode?: string

  @query("fs-theme")
  theme?: Theme

  @query('#field')
  form: FormField<FormDefinition, Object> | undefined

  private _settings: Settings | undefined
  private themes?: any

  render() {
    if (!this.definition) return
    let mode = this.settings?.['mode'];
    let field = createField({ id: 'field', library: this.library, context: this.context, settings: this.settings, definition: this.definition, value: this.value, parentPath: this.path(), errors: this.errors, clickHandler: (event: CustomEvent) => this.clicked(event), changeHandler: (event: FieldChangeEvent<any>) => this.changed(event), inputHandler: (event: FieldChangeEvent<any>) => this.inputted(event), invalidHandler: (event: InvalidEvent) => this.invalid(event) });
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined((<any>this.definition)?.['action'])}" method="${ifDefined((<any>this.definition)?.['method'])}" target="${ifDefined((<any>this.definition)?.['target'])}">${field}<slot></slot></form>`
    const classes = `themed ${this.mode || ""}`
    return html`<fs-theme .mode=${mode} .themes=${this.themes} @modeSwitched=${this.updateMode}><div class=${classes}>${form}</div></fs-theme>`
  }

  protected firstUpdated(): void {
    this.mode = this.theme?.mode
  }

  public path(): string {
    return this.parentPath || ""
  }

  protected inputted(e: FieldInputEvent<any>) {
    this.dispatchEvent(new FieldInputEvent<any>(e.detail?.name, e.detail?.value));
  }

  protected changed(e: FieldChangeEvent<any>) {
    this.dispatchEvent(new FieldChangeEvent(e.detail?.name, e.detail?.value));
  }

  protected invalid(e: InvalidEvent) {
    this.dispatchEvent(new InvalidEvent(e.detail));
  }

  protected updateMode(e: CustomEvent) {
    this.mode = e.detail
  }

  private constructStyle(settings: Settings, mode: string) {
    const style = this.concatProperties(settings?.['colors']?.[mode]) + this.concatProperties(settings?.['fonts']) + this.concatProperties(settings?.['spacing'])
    return style
  }

  private concatProperties(properties?: Object): string {
    let style = ""
    if (properties) {
      Object.entries(properties).forEach(([key, value]) => {
        if (key.startsWith("--")) {
          style += `${key}:${value};`
        }
      })
    }
    return style
  }
}

getLibrary("native").registerComponent("styledForm", {
  importPath: "@formsey/fields-native/StyledForm",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<FormDefinition, any>) => {
    return html`<formsey-styled-form id="${ifDefined(id)}" .library=${library} .settings=${settings as any} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-styled-form>`
  }
})