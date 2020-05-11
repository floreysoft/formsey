import { css } from 'lit-element';

export const INPUT_STYLE = css`
  .input {
    user-select: auto;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: var(--formsey-input-height, 34px);
    font-family: var(--formsey-label-font-family, var(--formsey-font-family));
    border-radius: var(--formsey-input-border-radius, 4px);
    padding: var(--formsey-input-padding, 8px);
    background: var(--formsey-input-background, #99999920);
    border: var(--formsey-input-border, 1px solid transparent);
    transition: border 0.12s ease-out;
  }
  .input:focus-within {
    border: 1px solid var(--formsey-primary-color,  #020b2f);
  }`

export const NESTED_FORM_STYLE = css`
  ::part(title) {
    margin: var(--formsey-selectable-title-margin, 4px 0 2px 0);
    font-size: var(--formsey-selectable-title-font-size, 18px);
  }

  ::part(description) {
    margin: var(--formsey-selectable-title-margin, 4px 0 2px 0);
    font-size: var(--formsey-selectable-title-font-size, 16px);
  }`