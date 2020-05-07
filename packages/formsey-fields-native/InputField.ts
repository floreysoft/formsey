import { InputFieldDefinition, LabeledField, StringFieldDefinition } from '@formsey/core';
import { InvalidError, InvalidEvent } from '@formsey/core/InvalidEvent';
import { css, html, property, query } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export class InputField<T extends InputFieldDefinition> extends LabeledField<T, string> {
  public static formAssociated = true;

  @property({ converter: Object })
  set definition(definition: T) {
    this.autofocus = definition.autofocus
    this._definition = definition
  }

  get definition() {
    return this._definition
  }

  @property({ type: String })
  value: string;

  @property({ type: Boolean, reflect: true })
  autofocus: boolean;

  @query("#input")
  input : HTMLInputElement

  protected internals: any
  private _definition: T

  static get styles() {
    return [...super.styles, css`
    input {
      width: 100%;
      height: var(--formsey-input-height, 34px);
      box-sizing: border-box;
      border-radius: var(--formsey-input-border-radius, 4px);
      border: 1px solid var(--formsey-input-border-color, #d5d5d5);
      padding: var(--formsey-input-padding, 8px);
      background: var(--formsey-input-background, linear-gradient(45deg, rgba(245,245,245,1) 0%, rgba(239,239,239,1) 33%, rgba(242,242,242,1) 100%));
      outline: none;
      user-select: auto;
      transition: all 0.2s;
    }
    input:focus {
      border: 1px solid var(--formsey-input-focus-border-color, #a0a0a0);
    }
    `]
  }

  constructor() {
    super()
    // @ts-ignore
    this.internals = this.attachInternals();
  }

  protected formResetCallback() {
    this.value = '';
  }

  protected checkProperties(): void {
    if (!this.definition) {
      throw new Error("property 'definition' required");
    }
  }

  protected renderField() {
    return html`<input id="input" type="${this.type}" ?autofocus=${ifDefined(this.definition.autofocus)} ?disabled=${ifDefined(this.definition.disabled)} ?required="${ifDefined(this.definition.required)}" @input="${this.changed}" @invalid="${this.invalid}" name="${this.definition.name}" placeholder="${ifDefined((<StringFieldDefinition>this.definition).placeholder)}" autocomplete="${ifDefined(this.definition.autocomplete)}" pattern="${ifDefined(((<StringFieldDefinition>this.definition).pattern))}" minlength="${ifDefined((<StringFieldDefinition>this.definition).minlength)}" maxlength="${ifDefined((<StringFieldDefinition>this.definition).maxlength)}"  min="${ifDefined((<any>this.definition).min)}" max="${ifDefined((<any>this.definition).max)}" step="${ifDefined((<any>this.definition).step)}"  .value="${ifDefined(this.value)}">`
  }

  focusField(path: string) {
    if ( path == this.definition.name ) {
      this.input.focus()
    }
  }

  validate(report : boolean) {
    this.input.setCustomValidity("")
    return this.input.checkValidity() as boolean
  }

  invalid() {
    let validityState = {}
    for ( let key in this.input.validity ) {
      if ( this.input.validity[key] ) {
        validityState[key] = this.input.validity[key]
      }
    }
    if ( this.definition.customValidity && !this.input.validity.valid ) {
      this.input.setCustomValidity(this.definition.customValidity)
    }
    this.errors[this.definition.name] = this.error ? this.error : new InvalidError(this.input.validationMessage, false, validityState )
    this.dispatchEvent(new InvalidEvent(this.errors))
  }

  protected get type() : string {
    return "text"
  }
}