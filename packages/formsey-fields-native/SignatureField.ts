import { html, property, customElement } from 'lit-element';
import SignaturePad from 'signature_pad';
import { Field, ValueChangedEvent, SignatureFieldDefinition } from '@formsey/core';

@customElement("formsey-signature")
export class SignatureField extends Field<SignatureFieldDefinition, string> {
  @property({ type: String })
  value: string;

  @property({ type: Number })
  width: Number;

  @property({ type: Number })
  height: Number;

  signaturePad: SignaturePad;

  renderField() {
    return html`<canvas id="signature-pad" width="${this.width}px" height="${this.height}px"></canvas><button @click="${(event) => this.clear(event)}">Clear</button>`;
  }

  firstUpdated() {
    if (this.renderRoot) {
      const ctx: HTMLCanvasElement | null = this.renderRoot.querySelector('#signature-pad');
      if (ctx != null) {
        this.signaturePad = new SignaturePad(ctx);
        this.signaturePad.on();
        this.signaturePad.onEnd = (event: MouseEvent | Touch) => this.onStrokeEnd(event);
      }
    }
  }

  protected clear(e: Event) {
    this.signaturePad.clear();
    this.value = "";
    if ( this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }

  protected onStrokeEnd(e: MouseEvent | Touch) {
    this.value = this.signaturePad.toDataURL();
    if ( this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}