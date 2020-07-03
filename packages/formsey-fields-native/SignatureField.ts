import { ChangeEvent, LabeledField, register, SignatureFieldDefinition } from '@formsey/core';
import { html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import ResizeObserver from 'resize-observer-polyfill';
import SignaturePad from 'signature_pad';

export class SignatureField extends LabeledField<SignatureFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @property({ type: Object })
  width: Number;

  @property({ type: Object })
  height: Number;

  signaturePad: SignaturePad;

  @query("#signature-pad")
  canvas: HTMLCanvasElement

  private resizeObserver: ResizeObserver

  constructor() {
    super()
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        this.layout(entry.contentRect.width, entry.contentRect.height)
      }
    });
  }

  renderField() {
    return html`<div class="input" width="${ifDefined(this.definition.width)}px" height="${ifDefined(this.definition.height)}px"><canvas id="signature-pad" tabindex="0"></canvas><svg viewBox="0 0 32 32" @click="${this.clear}"><title>Clear</title><path d="M20 4v-4h-8v4h-8v4h24v-4zM24 10v16h-4v-16h-2v16h-4v-16h-2v16h-4v-16h-2v17c0 2 1 3 3 3h14c2 0 3-1 3-3v-17h-2z"></path></svg></div>`;
  }

  firstUpdated() {
    if (this.canvas) {
      this.signaturePad = new SignaturePad(this.canvas);
      this.signaturePad.on();
      this.signaturePad.onEnd = (event: MouseEvent | Touch) => this.onStrokeEnd(event);
      this.resizeObserver.observe(this.canvas)
    }
  }

  layout(width: number, height: number) {
    if (this.canvas) {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      this.canvas.getContext("2d").scale(ratio, ratio);
      setTimeout(() => { this.signaturePad.clear() }, 1);
    }
  }

  protected clear(e: Event) {
    this.signaturePad.clear();
    this.value = "";
    this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
  }

  protected onStrokeEnd(e: MouseEvent | Touch) {
    this.value = this.signaturePad.toDataURL();
    this.dispatchEvent(new ChangeEvent("inputChange", this.definition.name, this.value));
  }
}

register(["native", "vaadin", "material"], "signature", "formsey-signature", SignatureField);
