import { FieldDefinition, LabeledField, register } from '@formsey/core';
import { Marked, Renderer } from '@ts-stack/markdown';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { css, html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
hljs.registerLanguage('javascript', javascript);

export class MarkdownField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  set definition(definition: FieldDefinition) {
    this._definition = definition
    this.markup = Marked.parse(definition?.default ? definition.default : "")
  }

  get definition() {
    return this._definition
  }

  static get styles() {
    return [css`
      pre {
        background-color: var(--fs-panel-background-color);
        border-radius: var(--fs-border-radius);
        border: 1px solid var(--fs-border-color);
        padding: .5em;
        display:block;
        overflow-x:auto;
        white-space: pre-wrap;
      }
      .hljs-subst{color:#444}.hljs-comment{color:#888}.hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta-keyword,.hljs-name,.hljs-selector-tag{font-weight:bolder}.hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{color:#800}.hljs-section,.hljs-title{color:#800;font-weight:700}.hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#bc6060}.hljs-literal{color:#78a960}.hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{color:#397300}.hljs-meta{color:#1f7199}.hljs-meta-string{color:#4d99bf}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}
      ` ]
  }

  private markup: string
  private _definition: FieldDefinition

  constructor() {
    super()
    Marked.setOptions({
      renderer: new Renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) => hljs.highlightAuto(code).value
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
    return html`${unsafeHTML(this.markup)}`
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this.attachShadow({ mode: 'open' });
  }
}
register("formsey-markdown", MarkdownField, ["native", "vaadin", "material"], "markdown", { importPath: "@formsey/fields-native-extended/MarkdownField", focusable : false})