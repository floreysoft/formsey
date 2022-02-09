import { LabeledField } from '@formsey/core';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { Marked, Renderer } from '@ts-stack/markdown';
import hljs from  'highlight.js';
import langTypescript from 'highlight.js/lib/languages/typescript';
import langJavascript from 'highlight.js/lib/languages/javascript';
import langShell from 'highlight.js/lib/languages/shell';
import langXML from 'highlight.js/lib/languages/xml';
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';

@customElement("formsey-markdown")
export class MarkdownField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  // @ts-ignore
  set definition(definition: FieldDefinition) {
    this._definition = definition
    this.markup = Marked.parse(definition?.default ? definition.default : "")
    this.requestUpdate()
  }

  get definition() {
    return this._definition
  }

  private markup: string = ""
  private _definition: FieldDefinition = {}

  constructor() {
    super()
    hljs.registerLanguage('typescript', langTypescript);
    hljs.registerLanguage('javascript', langJavascript);
    hljs.registerLanguage('shell', langShell);
    hljs.registerLanguage('html', langXML);
    const renderer = new Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
      const html = linkRenderer.call(renderer, href, title, text);
      return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
    Marked.setOptions({
      renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, language) => language ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value
    });
  }

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default
    }
    return true
  }

  renderField() {
    return html`<div class="content">${unsafeHTML(this.markup)}</div>`
  }
}

getLibrary("native").registerComponent("markdown", {
  importPath: "@formsey/fields-native-extended/MarkdownField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<FieldDefinition, string>) => {
    return html`<formsey-markdown id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value as any} .parentPath=${parentPath} .errors=${errors as any} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-markdown>`
  }
})