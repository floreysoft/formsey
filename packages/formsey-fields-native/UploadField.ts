import { LabeledField, UploadFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators";
import { ifDefined } from 'lit/directives/if-defined';


interface FileObject {
  name: string
  data: string | ArrayBuffer
  type: string
  size: number
}

interface Messages {
  prompt: string
}

export let ICON_FILE = html`<svg viewBox="0 0 32 32"><path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.122 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path></svg>`
export let ICON_UPLOAD = html`<svg viewBox="0 0 24 24"><path d="M8 12h4v-6h3l-5-5-5 5h3v6zM19.338 13.532c-0.21-0.224-1.611-1.723-2.011-2.114-0.265-0.259-0.644-0.418-1.042-0.418h-1.757l3.064 2.994h-3.544c-0.102 0-0.194 0.052-0.24 0.133l-0.816 1.873h-5.984l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133h-3.544l3.063-2.994h-1.756c-0.397 0-0.776 0.159-1.042 0.418-0.4 0.392-1.801 1.891-2.011 2.114-0.489 0.521-0.758 0.936-0.63 1.449l0.561 3.074c0.128 0.514 0.691 0.936 1.252 0.936h16.312c0.561 0 1.124-0.422 1.252-0.936l0.561-3.074c0.126-0.513-0.142-0.928-0.632-1.449z"></path></svg>`
export const ICON_REMOVE = html`<svg viewBox="0 0 32 32"><title>Clear</title><path d="M20 4v-4h-8v4h-8v4h24v-4zM24 10v16h-4v-16h-2v16h-4v-16h-2v16h-4v-16h-2v17c0 2 1 3 3 3h14c2 0 3-1 3-3v-17h-2z"></path></svg>`

@customElement("formsey-upload")
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

  protected renderField() {
    if (!this.value) {
      this.value = []
    }
    return html`<div class="input">${!this.definition.multiple && this.value.length > 0 ? undefined : html`<label @dragover="${this.dragOver}" @dragenter="${this.dragEnter}" @dragleave="${this.dragLeave}" @drop="${this.drop}"><input tabindex="0" aria-labelledby="${this.elementId}" type="file" ?multiple="${this.definition.multiple}" capture="${ifDefined(this.definition.capture)}" accept="${this.definition.accept ? this.definition.accept.join(',') : ''}" @change="${(e: Event) => this.handleFiles(Array.from(this.input.files))}" @focus="${this.focused}" @blur="${this.blurred}" id="file"><div class="prompt"><span>${this.messages.prompt}</span>${ICON_UPLOAD}</div></label>`}
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

  public focusField(path: string) {
    if ( this.input ) {
      this.input.focus()
      return true
    }
    return false
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
    this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
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
        this.dispatchEvent(new ValueChangedEvent("inputChange", this.definition.name, this.value));
        this.requestUpdate()
      }, false);
      reader.readAsDataURL(file)
    })
  }
}

getLibrary("native").registerComponent("upload", {
  importPath: "@formsey/fields-native/UploadField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, invalidHandler, id }: Resources<UploadFieldDefinition, FileObject[]>) => {
    return html`<formsey-upload id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-upload>`
  }
})