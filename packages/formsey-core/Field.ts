import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { FieldDefinition } from './FieldDefinitions';
import { InvalidErrors } from './InvalidEvent';
import { ValueChangedEvent } from './ValueChangedEvent';

export interface FormConfiguration {
  [index: string]: string
}

export function hacktml(parts, ...args) {
  const newArgs = args.concat().slice(1, -1)
  const newParts = parts.concat().slice(1, -1)
  newParts[0] = "<" + args[0] + newParts[0]
  newParts[newParts.length - 1] = newParts[newParts.length - 1] + args[0] + ">";
  return html(newParts, ...newArgs);
}

export const createField = (configuration: FormConfiguration, definition: FieldDefinition, value: Object, errors: InvalidErrors, valueChangedHandler: any, invalidHandler: any): TemplateResult => {
  const tag = configuration[definition.type];
  if (tag) {
    return hacktml`<${tag} .configuration=${configuration} .definition=${definition} .value=${value} .errors=${errors} @valueChanged=${valueChangedHandler} @validationFailed=${invalidHandler}></${tag}>`;
  } else {
    console.error("Your form is using a field of type=" + definition.type + " but no matching tag has been found in your configuration!");
  }
  return html``;
}

export abstract class Field<T extends FieldDefinition, V> extends LitElement {
  @property({ converter: Object })
  configuration: FormConfiguration

  @property({ type: Object })
  definition: T

  @property({ type: Object })
  value: V;

  @property({ converter: Object })
  set errors(errors: InvalidErrors) {
    this.errorMessage = undefined
    if (errors && this.definition.name) {
      let error = errors[this.definition.name]
      if (error) {
        this.errorMessage = error.errorMessage
      }
    }
    this._errors = errors;
    this.requestUpdate();
  }

  get errors() {
    return this._errors
  }

  _errors: InvalidErrors
  errorMessage: string

  public checkValidity(): boolean {
    return true;
  }

  static get styles() {
    return [css`
    .hidden {
      display: none;
    }`]
  }

  protected shouldUpdate(): boolean {
    if (typeof this.definition === "undefined") {
      return false
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.value && this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    if (this.definition.hidden) {
      return false
    }
    return true
  }

  protected render(): void | TemplateResult {
    return html`${this.renderField()}`
  }

  protected abstract renderField(): TemplateResult | void;

  protected checkProperties(): void {
  }

  protected update(changedProperties: never) {
    this.checkProperties();
    super.update(changedProperties);
  }

  protected valueChanged(e: any) {
    this.value = e.currentTarget.value;
    if (this.definition.name) {
      this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
    }
  }
}

export abstract class CompoundField<T extends FieldDefinition, V> extends Field<T, V> {
  protected renderHeader() {
  }

  protected includeOptionalField(fields: FieldDefinition[], include: boolean, type: string, name: string, helpText: string, autofill: string) {
    if (include) {
      fields.push({
        type: type,
        name: name,
        helpText: helpText,
        autofill: autofill
      })
    }
  }
}