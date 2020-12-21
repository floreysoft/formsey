import { css } from 'lit-element';

export const FORM_STYLES = css`
  .input:focus-within {
    box-shadow: 0 0 2px var(--lumo-primary-color-50pct);
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
    display: block;
    align-self: flex-start;
    font-weight: 500;
    font-size: var(--lumo-font-size-s);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
    line-height: 1;
    padding-top: var(--lumo-space-m);
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

  .lfw:hover .lfht, .lfw:hover .lfl {
    color: var(--lumo-body-text-color);
  }

  .lfw:focus-within .lfl {
    color: var(--lumo-primary-text-color);
  }

  /* Stretch buttons */
  .lfw vaadin-button {
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
    border-radius: var(--lumo-border-radius);
  }

  formsey-youtube iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Image field */
  .if {
    width: 100%;
  }
  .if>img {
    max-width: 100%;
    height: auto;
  }

  /* Images field */
  .ifi {
    column-gap: 0px;
    line-height: 0;
  }


  formsey-image-checkbox {
    display: inline-block;
    position: relative;
  }
  formsey-image-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  formsey-image-checkbox img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    opacity: .9;
    transition: opacity 0.2s ease-out, transform .2s;
    transform-origin: 50% 50%;
  }
  formsey-image-checkbox img:hover {
    opacity: .95;
  }
  formsey-image-checkbox :checked+label>img {
    opacity: 1;
  }
  formsey-image-checkbox label {
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    user-select: none;
    transition: transform .2s;
    line-height: 1.15;
    margin-bottom: .5em;
  }
  formsey-image-checkbox label::after {
    content: ' ';
    color: var(--formsey-text-color, var(--fs-accent-color-text, #ffffff));
    background-color: var(--formsey-background-color, var(--fs-background-color, inherit));
    border-radius: 50%;
    position: absolute;
    right: .25em;
    top: .25em;
    width: 1em;
    height: 1em;
    text-align: center;
    line-height: 1em;
    transform-origin: 50% 50%;
    display:none;
    box-shadow: var(--formsey-box-shadow, var(--fs-box-shadow));
  }
  formsey-image-checkbox :checked+label>img {
    box-shadow: 0px 0px 3px 0 var(--fs-text-color);
  }
  formsey-image-checkbox :focus+label {
    transform: scale(.95);
  }
  formsey-image-checkbox :checked+label {
    transform: scale(.9);
  }
  formsey-image-checkbox :focus+label>img {
    box-shadow: 0px 0px 3px 0 var(--fs-border-color-focus);
    opacity: .9;
  }
  formsey-image-checkbox :checked+label::after {
    display:block;
  }

  /* Sourcecode field */
  formsey-sourcecode .input {
    height: 150px;
    padding: 0;
    overflow: hidden;
  }

  /* Signature field */
  formsey-signature {
    --formsey-signature-pen-color: var(--lumo-body-text-color);
  }

  formsey-signature .input {
    position: relative;
    height: 150px;
    max-width: 100%;
    border: 1px solid transparent;
    border-radius: var(--lumo-border-radius);
    background: var(--lumo-shade-10pct);
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
    stroke-width: 0;
    transition: fill 0.12s ease-out;
    fill: var(--lumo-secondary-text-color);
  }

  formsey-signature svg:hover {
    fill: var(--lumo-body-text-color);
  }

  /* Toolbar */
  .tb .ffg {
    display: inline-flex;
    align-items: center;
  }

  .tb .fff {
    width: initial;
  }

  .tb vaadin-button {
    min-width: 1em;
  }

  /* Color field */
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
  formsey-upload label {
    display: flex;
  }

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
    border: 1px solid var(--lumo-contrast-30pct);
    border-radius: var(--lumo-border-radius);
    min-height: calc(var(--lumo-size-m) - 2px);
  }

  formsey-upload .files, formsey-upload .prompt {
    color: var(--lumo-body-text-color);
    font-size: var(--lumo-font-size-m);
    line-height: initial;
    cursor: default;
    display: grid;
    grid-template-columns: 2.5em 1fr max-content 20px;
    grid-gap: 5px;
    align-items: center;
  }

  formsey-upload .prompt {
    flex-grow: 1;
    grid-template-columns: 1fr max-content;
    cursor: pointer;
    line-height: calc(var(--lumo-size-m) - 2px);
    font-weight: 400;
  }

  formsey-upload .prompt span {
    padding-left: 4px;
  }

  formsey-upload .prompt svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
  }

  formsey-upload .files {
    font-size: var(--lumo-font-size-s);
  }

  formsey-upload .preview, formsey-upload .preview svg {
    max-width:2em;
    max-height:2em;
    width: auto;
    height: auto;
    padding: 0.1em 0.3em;
  }

  formsey-upload .over {
    border: 1px dashed var(--lumo-contrast-60pct);
    color: var(--lumo-primary-color);
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

  /* Table */
  formsey-table .tblh {
    display: grid;
  }
  formsey-table .tblr {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* Repeating section */
  formsey-repeating-section .form {
    position: relative;
    margin: 0.5em 0 0 0.8em;
    padding: 0 0 5px 15px;
    border-left: 2px solid var(--lumo-contrast-10pct);
    font-size: var(--lumo-font-size-m);
    transition: all 0.12s ease-out;
  }
  formsey-repeating-section .form:hover {
    border-left: 2px solid var(--lumo-contrast-30pct);
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
    border: 2px solid var(--lumo-contrast-30pct);
    padding: 0.2em;
    color: var(--lumo-secondary-text-color);
  }
  formsey-repeating-section button:focus {
    outline: none;
    border: 2px solid var(--lumo-contrast-90pct);
  }
  formsey-repeating-section .form:hover .fs-remove, formsey-repeating-section .fs-add:hover {
    border: 2px solid var(--lumo-contrast-50pct);
  }
  formsey-repeating-section .fs-add {
    margin: 0.2em 0.1em 0.1em;
  }

  @media (pointer: coarse) {
    formsey-repeating-section .form {
      padding: 0 0 0 1.5em;
      margin: .25em 0 .25em 1em;
    }
    formsey-repeating-section button {
      width: 2em;
      height: 2em;
    }
    formsey-repeating-section button svg {
      width: 2em;
    }
    formsey-repeating-section .fs-remove-wrapper {
      padding: 0.4em 0;
      left: -1em;
      top: calc(50% - 1.375em);
    }
  }

  /* Markdown field */
  formsey-markdown .content {
    line-height: 1.35;
  }
  formsey-markdown pre {
    padding: var(--lumo-space-s);
    display:block;
    overflow-x:auto;
    white-space: pre-wrap;
    line-height: var(--lumo-line-height-m);
    margin: 0;
  }
  formsey-markdown code {
    background: none;
  }

  formsey-markdown pre, formsey-markdown p, formsey-markdown ul, formsey-markdown h1, formsey-markdown h2, formsey-markdown h3, formsey-markdown h4 {
    margin: 0 0 var(--lumo-space-xs) 0;
  }
  formsey-markdown h1, formsey-markdown h2, formsey-markdown h3, formsey-markdown h4 {
    color: var(--lumo-primary-color);
  }
  .hljs-subst{
    color: var(--lumo-body-text-color);
  }
  .hljs-comment{
    color: var(--lumo-secondary-text-color);
  }
  .hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta-keyword,.hljs-name,.hljs-selector-tag{
      font-weight:bolder
  }
  .hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{
      color: var(--lumo-error-text-color);
  }
  .hljs-section,.hljs-title{
    color: var(--lumo-error-text-color);
    font-weight:700
  }
  .hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{
      color:#bc6060
  }
  .hljs-literal{
    color: var(--lumo-success-text-color);
  }
  .hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{
    color: var(--lumo-success-text-color);
  }
  .hljs-meta{
    color: var(--lumo-primary-color);
  }
  .hljs-meta-string{
      color: var(--lumo-primary-color);
  }
  .hljs-emphasis{
      font-style:italic
  }
  .hljs-strong{
      font-weight:bold
  }

  /* Sourcecode field */
  formsey-sourcecode .lfw {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  formsey-sourcecode #editor {
    height: 100%;
  }
`
