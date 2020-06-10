import { ChangeEvent, LabeledField, register, UploadFieldDefinition } from '@formsey/core';
import { css, html, property, query, TemplateResult } from 'lit-element';
import { ICON_FILE, ICON_REMOVE, ICON_UPLOAD } from '.';
import { INPUT_STYLE } from './styles';
import { ifDefined } from 'lit-html/directives/if-defined.js';

interface FileObject {
  name: string
  data: string | ArrayBuffer
  type: string
  size: number
}

interface Messages {
  prompt: string
}

export class UploadField extends LabeledField<UploadFieldDefinition, FileObject[]> {
  public static formAssociated = true;

  @property({ type: Object })
  value: FileObject[]

  @property({ type: Object })
  messages: Messages = {
    prompt: "Click to pick or drop file(s)"
  }

  @query("label")
  label: HTMLElement

  @query("input")
  input: HTMLInputElement

  static get styles() {
    return [...super.styles, INPUT_STYLE, css`
    input[type="file"] {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }

    .input {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      height: auto;
      padding: 0;
    }

    .files, .prompt {
      line-height: initial;
      cursor: default;
      display: grid;
      grid-template-columns: 24px 1fr max-content 20px;
      grid-gap: 5px;
      align-items: center;
    }

    .prompt {
      grid-template-columns: 1fr max-content;
      cursor: pointer;
      min-height: calc( var(--formsey-input-height, 2em) - 2px);
    }

    .prompt span {
      padding-left: 4px;
    }

    .prompt svg {
      width: 1.2em;
      height: 1.2em;
    }

    .files {
      font-size: var(--fs-font-size, smaller);
    }

    .preview, .preview svg {
      max-width:2em;
      max-height:2em;
      width: auto;
      height: auto;
      padding: 0.1em 0.3em;
    }

    .over {
      border: 1px dashed var(--formsey-primary-color, #999);
      color: var(--formsey-primary-color, #999);
    }

    .filename {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .remove {
      outline: none;
    }

    .remove svg {
      margin-top: 3px;
      width: 1.2em;
      fill: currentColor;
      cursor: pointer;
    }
    `]
  }

  protected renderField() {
    if (!this.value) {
      this.value = []
    }
    return html`<div class="input">${!this.definition.multiple && this.value.length > 0 ? undefined : html`<label @dragover="${this.dragOver}" @dragenter="${this.dragEnter}" @dragleave="${this.dragLeave}" @drop="${this.drop}"><input type="file" ?multiple="${this.definition.multiple}" capture="${ifDefined(this.definition.capture)}" accept="${this.definition.accept ? this.definition.accept.join(',') : ''}" @change="${(e: Event) => this.handleFiles(Array.from(this.input.files))}" tabindex="0" id="file"><div class="prompt"><span>${this.messages.prompt}</span>${ICON_UPLOAD}</div></label>`}
    ${this.value.length > 0 ? html`<div class="files">
    ${this.value.map((file: FileObject) => {
      const aMultiples = ["kb", "mb", "gb", "tb"];
      let niceSize: string
      for (let nMultiple = 0, nApprox = file.size / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        niceSize = nApprox.toFixed(3) + " " + aMultiples[nMultiple]
      }
      let preview: TemplateResult
      file.type.startsWith("image/") ? preview = html`<img class="preview" src="${file['data']}">` : preview = ICON_FILE
      return html`${preview}<div class="filename" title="${file.name}">${file.name}</div><div>${niceSize}</div><div tabindex="0" class="remove" @click="${ ( e: Event) => { this.removeFile(file.name) }}">${ICON_REMOVE}</div>`
    }
    )}
    </div>` : undefined}</div>`
  }

  private dragOver(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  private dragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
    this.label.classList.add("over")
  }

  private dragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    this.label.classList.remove("over")
  }

  private drop(e) {
    e.preventDefault()
    e.stopPropagation()
    let dt = e.dataTransfer
    let files = [...dt.files]
    this.handleFiles(files)
  }

  private removeFile(name: string) {
    this.value = this.value.filter( ( file : FileObject ) => file.name != name)
    this.requestUpdate()
    this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
  }

  private handleFiles(files: File[]) {
    files.forEach((file: File) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.value.push({
          data: reader.result,
          name: file.name,
          type: file.type,
          size: file.size
        })
        this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
        this.requestUpdate()
      }, false);
      reader.readAsDataURL(file)
    })
  }
}
register("formsey-upload", UploadField)