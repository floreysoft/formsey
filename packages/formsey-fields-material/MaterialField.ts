import { FieldDefinition, LabeledField } from '@formsey/core';
import { css } from 'lit-element';

export abstract class MaterialField<T extends FieldDefinition, V> extends LabeledField<T, V> {
  static get styles() {
    return [css`
    .wrapper {
      box-sizing: border-box;
      transition: all 0.2s ease-out;
    }

    .invalid {
      background-color: var(--formsey-invalod_color, var(--mdc-theme-error, #b0002010));
      padding: 0 0.5rem 0.1rem;
      margin: 0.1rem 0;
      border-radius: var(--formsey-invalid-border-radius, var(--lumo-border-radius-m, 0.2em));
    }

    .error-text {
      color: var(--formsey-error-text-color, var(--mdc-theme-error, #b00020));
      font-family: var(--formsey-prompt-font-family, Roboto, sans-serif);
      font-size: var(--formsey-error-font-size, var(--lumo-font-size-s));
      line-height: var(--formsey-error-line-height, var(--lumo-line-height-s));
    }

    .prompt {
      margin: var(--formsey-prompt-margin, 0.5em 0 0 0);
      font-family: var(--formsey-prompt-font-family, Roboto, sans-serif);
      font-size: var(--formsey-prompt-font-size, 1em);
      line-height: var(--formsey-prompt-line-height, 1.5);
      color: var(--formsey-prompt-color, var(--mdc-theme-text-primary-on-light));
    }
    .required {
      font-family: var(--formey-required-font-family, Roboto, sans-serif);
      font-size: 0.6em;
      vertical-align: top;
      color: var(--formsey-required-color, var(--mdc-theme-error, #b00020));
      margin-left: 0.5em;
    }
    .help-text {
      font-family: var(--formey-help-text-font-family, Roboto, sans-serif);
      font-size: var(--formey-help-text-font-size, 0.75em);
      line-height: var(--formsey-help-text-line-height, 1.5);
      color: var(--formsey-help-text-color, var(--mdc-theme-text-secondary-on-light));
      margin: var(--formsey-help-text-margin, 0.25em 0 0.5em  0);
    }`]
  }
}