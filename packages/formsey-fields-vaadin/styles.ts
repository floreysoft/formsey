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

`
