import { html, property, query, customElement, PropertyValues } from 'lit-element';
import * as ace from 'ace-builds/src-min-noconflict/ace.js'
import { Field, ValueChangedEvent, FieldDefinition } from '@formsey/core';

@customElement("formsey-sourcecode")
export class SourceCodeField extends Field<FieldDefinition, string> {
  @property({ type: String })
  set value(value: string) {
    if (this.editor) {
      this.silent = true
      this.editor.setValue(value, -1)
      this.silent = false
    }
  }

  @property()
  mode : string = "javascript"

  @property()
  theme : string = "tomorrow_night.css"

  @property({ type: Number })
  width: Number;

  @property({ type: Number })
  height: Number;

  @property({ type: Boolean })
  gutter : boolean = false

  @query("#editor")
  private div: HTMLElement

  private editor: ace
  private silent: boolean = false

  protected renderStyles() {
    return `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: var(--lumo-border-radius);
      border: 1px solid var(--lumo-contrast-20pct);
      margin: var(--lumo-space-xs) 0;
    }
    #editor {
      height: 100%;
    }`
  }

  protected renderField() {
    return html`<div id="editor"></div>`;
  }

  firstUpdated() {
    this.editor = ace.edit(this.div)
    this.editor.renderer.attachToShadowRoot()
    if (this.value) {
      this.editor.setValue(this.value)
      this.editor.clearSelection()
    }
    this.editor.getSession().on('change', (event: any) => this.valueChanged())
  }

  updated(changedProperties : PropertyValues) {
    this.updateOptions()
  }

  resize() {
    if (this.editor) {
      this.editor.resize()
    }
  }

  protected valueChanged() {
    if (this.definition.name && !this.silent) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.editor.getValue()));
    }
  }

  protected updateOptions() {
    if (this.editor) {
        this.editor.renderer.setShowGutter(this.gutter)
        this.editor.setTheme("ace/theme/"+this.theme)
        this.editor.session.setMode("ace/mode/"+this.mode)
    }
  }
}