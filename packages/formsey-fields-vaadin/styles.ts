import { css } from 'lit-element';

export const FORM_STYLES = css`
  .fft,.ffd {
    color: var(--lumo-secondary-text-color);
    font-weight: 500;
    font-size: var(--lumo-font-size-l);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
  }
  .ffd {
    font-size: var(--lumo-font-size-m);
  }
  .ffg {
    display: inline-grid;
    grid-gap: 5px 5px;
    width: 100%;
    box-sizing: border-box;
  }
  .fff {
    width: 100%;
  }

  .lfw {
    color: var(--lumo-secondary-text-color);
  }

  .lfl {
    align-self: flex-start;
    font-weight: 500;
    font-size: var(--lumo-font-size-s);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
    line-height: 1;
    padding-bottom: 0.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
  }

  .lfht {
    display: block;
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
    margin-top: .4em;
    margin-left: calc(var(--lumo-border-radius-m)/ 4);
    transition: color .2s;
  }

  .lfw:hover .lfht,  .lfw:hover .lfl {
    color: var(--lumo-body-text-color);
  }

  /* YouTube field */
  formsey-youtube {
    display: table;
    width: 100%;
  }

  formsey-youtube .fs-video {
    position: relative;
    overflow: hidden;
    max-width: 100%;
  }

  formsey-youtube iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Signature field */
  formsey-signature .input {
    position: relative;
    height: 150px;
    max-width: 100%;
  }

  formsey-signature .input:focus-within {
    border: 1px solid var(--formsey-primary-color,  #020b2f);
  }

  formsey-signature canvas {
    width: 100%;
    height: 100%;
    outline: none;
  }

  formsey-signature svg {
    position: absolute;
    width: 16px;
    right: 8px;
    top: 8px;
    fill: var(--formsey-signature-clear-icon-color, #757c98);
    stroke-width: 0;
    transition: fill 0.12s ease-out;
  }

  formsey-signature svg:hover {
    fill: var(--formsey-primary-color,  #020b2f);
  }

  /* .Color field */
  input[type="color"] {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 1.8em;
    height: 1.8em;
    border: none;
    padding: 0 1px;
  }

  .cf {
    position: relative;
    width: 100%;
  }

  .cf input[type="text"] {
    text-transform: uppercase;
  }

  .cfp {
    margin: calc(.4em - 1px);
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    border: 1px solid transparent;
  }

  .cf:focus-within .cfps {
    border-color: var(--lumo-contrast-60pct);
  }

  .cf svg {
    width: 1.2em;
    height: 1.2em;
    fill: var(--lumo-contrast-60pct);
   }

   .cf svg:hover {
    fill: var(--lumo-contrast-90pct);
  }

  /* Upload field */
  formsey-upload input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: relative;
    z-index: -1;
  }

  formsey-upload .input {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: auto;
    padding: 0;
  }

  formsey-upload .files, formsey-upload .prompt {
    line-height: initial;
    cursor: default;
    display: grid;
    grid-template-columns: 24px 1fr max-content 20px;
    grid-gap: 5px;
    align-items: center;
  }

  formsey-upload .prompt {
    flex-grow: 1;
    grid-template-columns: 1fr max-content;
    cursor: pointer;
    min-height: calc( var(--formsey-input-height, 2em) - 2px);
  }

  formsey-upload .prompt span {
    padding-left: 4px;
  }

  formsey-upload .prompt svg {
    width: 1.2em;
    height: 1.2em;
  }

  formsey-upload .files {
    font-size: var(--fs-font-size, smaller);
  }

  formsey-upload .preview, formsey-upload .preview svg {
    max-width:2em;
    max-height:2em;
    width: auto;
    height: auto;
    padding: 0.1em 0.3em;
  }

  formsey-upload .over {
    border: 1px dashed var(--formsey-primary-color, #999);
    color: var(--formsey-primary-color, #999);
  }

  formsey-upload .filename {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  formsey-upload .remove {
    outline: none;
  }

  formsey-upload .remove svg {
    margin-top: 3px;
    width: 1.2em;
    fill: currentColor;
    cursor: pointer;
  }

  /* Repeating section */
  formsey-repeating-section .form {
    position: relative;
    margin: 0.5em 0 0 0.8em;
    padding: 0 0 5px 15px;
    border-left: 1px solid var(--lumo-contrast-10pct);
    font-size: var(--lumo-font-size-m);
    transition: all 0.12s ease-out;
  }
  formsey-repeating-section .form:hover {
    border-left: 1px solid var(--lumo-contrast-30pct);
  }
  formsey-repeating-section .fs-remove-wrapper {
    position: absolute;
    line-height: 0;
    padding: 0.4em 0;
    top: calc(50% - 1em);
    left: -0.8em;
  }
  formsey-repeating-section button svg {
    width: 1em;
    height: auto;
    stroke-width: 0;
    fill: currentColor;
  }
  formsey-repeating-section button {
    display: flex;
    width: 1.4em;
    height: 1.4em;
    font-size: var(--lumo-font-size-m);
    border-radius: 50%;
    background-color: var(--lumo-base-color);
    transition: background-color 0.12s ease-out 0s;
    border: 1px solid var(--lumo-contrast-30pct);
    padding: 0.2em;
    color: var(--lumo-secondary-text-color);
  }
  formsey-repeating-section button:focus {
    outline: none;
    border: 1px solid var(--lumo-contrast-90pct);
  }
  formsey-repeating-section .form:hover .fs-remove, formsey-repeating-section .fs-add:hover {
    border: 1px solid var(--lumo-contrast-50pct);
  }
  formsey-repeating-section .fs-add {
    margin: 0.2em 0.1em 0.1em;
  }


`
