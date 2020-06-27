import { FieldDefinition, LabeledField, register } from '@formsey/core';
import { Marked, Renderer } from '@ts-stack/markdown';
import { html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export class MarkdownField extends LabeledField<FieldDefinition, string> {
  @property({ converter: Object })
  set definition(definition: FieldDefinition) {
    this._definition = definition
    this.markup = Marked.parse(definition?.default ? definition.default : "")
  }

  get definition() {
    return this._definition
  }

  private markup : string
  private _definition : FieldDefinition

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
        smartypants: false
      });
  }

  renderField() {
    return html`${unsafeHTML(this.markup)}`
  }
}
register("formsey-markdown", MarkdownField)