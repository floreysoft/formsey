import { css } from 'lit-element';

export const INPUT_STYLE = css`
  .input {
    user-select: auto;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: var(--formsey-input-height, 2em);
    font-family: var(--formsey-font-family, var(--fs-font-family, inherit));
    font-size: var(--formsey-font-size, var(--fs-font-size, inherit));
    color: var(--formsey-text-color, var(--fs-text-color, inherit));
    border-radius: var(--formsey-input-border-radius, var(--fs-border-radius, 3px));
    padding: var(--formsey-input-padding, var(--fs-widget-padding, .2em .3em));
    background: var(--formsey-input-background, var(--fs-widget-background-color-alpha, #99999920));
    border: var(--formsey-input-border, 1px solid transparent);
    transition: border 0.12s ease-out;
  }
  .input:focus-within {
    border: 1px solid var(--formsey-primary-color, var(--fs-accent-color, #020b2f));
  }`

export const NESTED_FORM_STYLE = css`
  ::part(title) {
      font-size: var(--formsey-title-font-size, larger);
      font-family: var(--formsey-title-font-family, var(--formsey-font-family, inherit));
      font-weight: var(--formsey-title-font-weight, inherit);
      line-height: var(--formsey-title-line-height, inherit);
      color: var(--formsey-title-color, inherit);
      margin: var(--formsey-title-margin, var(--fs-padding, 12px 0 4px 0));
    }
  }

  ::part(description) {
    font-size: var(--formsey-description-font-size, inherit);
    font-family: var(--formsey-description-font-family, var(--formsey-font-family, inherit));
    font-weight: var(--formsey-description-font-weight, inherit);
    line-height: var(--formsey-description-line-height, inherit);
    color: var(--formsey-description-color, #757c98);
    margin: var(--formsey-description-margin, var(--fs-padding, 12px 0 4px 0));
  }`