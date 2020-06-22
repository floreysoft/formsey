import { css } from 'lit-element';

export const LABELED_FIELD_STYLES = css`
  .wrapper {
    box-sizing: border-box;
    transition: all 0.2s ease-out;
    display: flex;
    flex-direction: column;
  }

  .label {
    font-family: var(--formsey-label-font-family, var(--formsey-font-family, inherit));
    font-size: var(--formsey-label-font-size, inherit);
    font-weight: var(--formsey-label-font-weight, inherit);
    color: var(--formsey-label-color, inherit);
    line-height: var(--formsey-label-line-height, inherit);
    padding: var(--formsey-label-padding, var(--fs-widget-padding, 4px 0 0 0));
    -webkit-font-smoothing: antialiased;
    transition: all 0.12s ease-out;
    opacity: 0.8;
  }

  .wrapper:focus-within .label {
    color: var(--formsey-primary-color, var(--fs-accent-color, inherit));
    opacity: 1;
  }

  .invalid {
    background-color: var(--formsey-invalod_color, var(--fs-background-color-error, #AA000044));
    padding: 0 0.5em 0.1em;
    border-radius: var(--formsey-invalid-border-radius, var(--fs-border-radius-m, 0.3em));
  }

  .error-text, .help-text {
    font-family: var(--formey-help-text-font-family, var(--formsey-font-family, inherit));
    font-size: var(--formey-help-text-font-size, smaller);
    line-height: var(--formsey-help-text-line-height, inherit);
    margin: var(--formsey-help-text-margin, 1px 0 0 0);
  }

  .error-text {
    color: var(--formsey-error-text-color, var(--lumo-error-text-color, #FC0000));
  }

  .help-text {
    color: var(--formsey-help-text-color, inherit);
    padding: var(--formsey-help-text-padding, var(--fs-widget-padding, 4px 0 0 0));
    opacity: 0.8;
    transition: opacity 0.12s ease-out;
  }

  .required {
    color: var(--formsey-required-color, var(--fs-text-color-error));
    margin: var(--formsey-required-margin, var(--fs-widget-padding, 0 0 0 4px));
    font-family: var(--formey-required-font-family, var(--formsey-font-family, inherit));
    font-size: var(--formey-required-font-size, smaller);
    line-height: var(--formsey-required-line-height, inherit);
    vertical-align: top;
  }

  .wrapper:focus-within .help-text {
    opacity: 1;
  }`