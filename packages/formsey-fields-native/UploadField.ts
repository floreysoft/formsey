import { LabeledField, register, TextFieldDefinition, ChangeEvent } from '@formsey/core';
import { css, html, property, query } from 'lit-element';
import { INPUT_STYLE } from './styles';

interface FileObject {
  name : string
  data : string | ArrayBuffer
  type : string
  size : number
}

export class UploadField extends LabeledField<TextFieldDefinition, FileObject[]> {
  public static formAssociated = true;

  @property({ type: Object })
  value: FileObject[]

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
      cursor: pointer;
      padding: 20px;
      min-height: 150px;
    }

    .preview {
      max-width:2em;
      max-height:2em;
      width: auto;
      height: auto;
    }

    .over {
      border: 1px dashed var(--formsey-primary-color, #999);
      color: var(--formsey-primary-color, #999);
    }
    `]
  }

  protected renderField() {
    if ( !this.value ) {
      this.value = []
    }
    return html`<label class="input" @dragover="${this.dragOver}" @dragenter="${this.dragEnter}" @dragleave="${this.dragLeave}" @drop="${this.drop}"><input type="file" multiple accept="image/*" @change="${ ( e : Event) => this.handleFiles(Array.from(this.input.files))}" tabindex="0" id="file">Click to pick or drop file(s)<div class="files">
    ${this.value.map((file : FileObject) => html`<img class="preview" src="${file['data']}"><div>${file.name}</div>`)}
    </div></label>`
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

  private handleFiles(files: File[]) {
    files.forEach((file: File) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        // convert image file to base64 string
        console.log(reader.result)
        this.value.push({
          data : reader.result,
          name : file.name,
          type: file.type,
          size : file.size

        })
        this.dispatchEvent(new ChangeEvent(this.definition.name, this.value));
        this.requestUpdate()
      }, false);
      reader.readAsDataURL(file)
    })
  }
}
register("formsey-upload", UploadField)