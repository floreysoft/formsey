import { LabeledField, SignatureFieldDefinition } from '@formsey/core';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { FieldChangeEvent } from '@formsey/core/Events';
import { html, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import SignaturePad from 'signature_pad';

@customElement("formsey-signature")
export class SignatureField extends LabeledField<SignatureFieldDefinition, string> {
  @property({ type: String })
  value: string | undefined

  @property({ type: Object })
  width: Number = 0

  @property({ type: Object })
  height: Number = 0

  signaturePad: SignaturePad | undefined

  @query("#signature-pad")
  canvas: HTMLCanvasElement | undefined

  private resizeObserver: ResizeObserver

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries: any, observer: any) => {
      for (const entry of entries) {
        this.layout(entry.contentRect.width, entry.contentRect.height)
      }
    });
  }

  renderField() {
    if (this.definition) {
      let fieldstyle = `width:${(this.definition.width && this.definition.width.length > 0) ? this.definition.width : "100%"};height:${(this.definition.height && this.definition.height.length > 0) ? this.definition.height : "100px"}`;
      return html`<div class="input" style="${fieldstyle}"><canvas id="signature-pad" tabindex="0" @focus="${this.focused}" @blur="${this.blurred}"></canvas><svg viewBox="0 0 32 32" @click="${this.clear}"><title>Clear</title><path d="M20 4v-4h-8v4h-8v4h24v-4zM24 10v16h-4v-16h-2v16h-4v-16h-2v16h-4v-16h-2v17c0 2 1 3 3 3h14c2 0 3-1 3-3v-17h-2z"></path></svg></div>`;
    }
  }

  firstUpdated() {
    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas);
      this.signaturePad.on();
      this.signaturePad.onEnd = (event: MouseEvent | Touch) => this.onStrokeEnd(event);
      this.resizeObserver.observe(this.canvas)
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("settings")) {
      const penColor = window.getComputedStyle(this).getPropertyValue('--formsey-signature-pen-color')
      if (this.signaturePad && penColor) {
        this.signaturePad.penColor = penColor
      }
    }
  }

  focusField() {
    if (this.canvas) {
      this.canvas.focus()
    }
  }

  layout(width: number, height: number) {
    if (this.canvas) {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      this.canvas.getContext("2d")!.scale(ratio, ratio);
      setTimeout(() => { this.signaturePad?.clear() }, 1);
    }
  }

  protected clear(e: Event) {
    this.signaturePad?.clear();
    this.value = "";
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }

  protected onStrokeEnd(e: MouseEvent | Touch) {
    this.value = this.signaturePad?.toDataURL();
    this.dispatchEvent(new FieldChangeEvent(this.path(), this.value));
  }
}

getLibrary("native").registerComponent("signature", {
  importPath: "@formsey/fields-native-extended/SignatureField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<SignatureFieldDefinition, string>) => {
    return html`<formsey-signature id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${inputHandler}"  @invalid=${invalidHandler}></formsey-signature>`
  }
})