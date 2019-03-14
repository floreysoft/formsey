import { LitElement, TemplateResult, html, property } from 'lit-element';
import { FieldDefinition } from './FieldDefinitions';
import { ValueChangedEvent } from './ValueChangedEvent';

export interface FormConfiguration {
  [index: string]: string
}

export function hacktml(parts, ...args) {
  const newArgs = args.concat().slice(1, -1)
  const newParts = parts.concat().slice(1, -1)
  newParts[0] = "<" + args[0] + newParts[0]
  newParts[newParts.length-1] = newParts[newParts.length-1] + args[0] + ">";
  return html(newParts, ...newArgs);
}

export const createField = (configuration: FormConfiguration, definition: FieldDefinition, value: Object, handler: any) : TemplateResult => {
  const tag = configuration[definition.type];
  if (tag) {
    return hacktml`<${tag} .configuration=${configuration} .definition=${definition} .value=${value} @valueChanged=${handler}></${tag}>`;
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

  value: V;

  protected render(): void | TemplateResult {
    if (typeof this.definition === "undefined") {
      return;
    } else if (typeof this.value === "undefined" && typeof this.definition.default != "undefined") {
      this.value = this.definition.default as V;
      if (this.definition.name) {
        this.dispatchEvent(new ValueChangedEvent(this.definition.name, this.value));
      }
    }
    if (this.definition.hidden) {
      return;
    } else {
      return html`${this.renderHeader()}${this.renderField()}`
    }
  }

  protected renderStyles(): string | void {
  }

  protected renderHeader(): TemplateResult | void {
    return html`
      <style>
        ${this.renderStyles()}
        .fs-prompt {
          flex: 0 0;
          margin: var(--lumo-space-m) 0 0 0;
          font-family: var(--lumo-font-family);
          font-size: var(--lumo-font-size-m);
        }
        .fs-help-text {
          flex: 1 0;
          font-family: var(--lumo-font-family);
          font-size: var(--lumo-font-size-xs);
          color: var(--lumo-secondary-text-color);
        }
        .fs-field {
          flex: 0 0;
          margin-bottom: 6px;
        }
        .hidden {
          display: none;
        }
      </style>
      ${this.definition.prompt ? html`<div class="fs-prompt">${this.definition.prompt}</div>` : html``}
      ${this.definition.helpText ? html`<div class="fs-help-text">${this.definition.helpText}</div>` : html``}`;
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

  protected includeOptionalField(fields: FieldDefinition[], include: boolean, type: string, name: string, helpText: string, autofill: string, colspan: number): number {
    if (include) {
      fields.push({
        type: type,
        name: name,
        helpText: helpText,
        autofill: autofill,
        colspan: colspan
      })
      return colspan;
    }
    return 0;
  }
}