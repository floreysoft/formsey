import { css } from 'lit-element';

export const FORM_STYLES = css`
  :host {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-animation: autofill 0s forwards;
        animation: autofill 0s forwards;
    }
    -webkit-font-smoothing: antialiased;
  }

  * {
    font: var(--formsey-font, inherit);
  }

  @media (pointer: coarse) {
    * {
      font: var(--formsey-font-coarse, inherit);
    }
  }

  @keyframes autofill {
    100% {
        background: transparent;
        color: inherit;
    }
  }

  @-webkit-keyframes autofill {
      100% {
          background: transparent;
          color: inherit;
      }
  }

  input[type="checkbox"], input[type="radio"] {
    margin: var(--formsey-padding, .2em .3em);
    font: inherit;
    color: inherit;
  }

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

  label {
    display: block;
    box-sizing: border-box;
  }

  .input {
    user-select: auto;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: var(--formsey-input-height, 2em);
    font: inherit;
    color: inherit;
    border-radius: var(--formsey-border-radius, 3px);
    padding: var(--formsey-padding, .2em .3em);
    background: var(--formsey-shade, #80808040);
    border: 1px solid var(--formsey-border, transparent);
    transition: border 0.12s ease-out;
  }

  .input:focus-within {
    border: 1px solid var(--formsey-border-focus, transparent);
  }

  button.input {
    display: flex;
    align-items: center;
    width: min-content;
    overflow: hidden;
    white-space: nowrap;
    justify-content: center;
    background: var(--formsey-widget-background);
  }
  button fs-icon + span {
    margin-left: .25em;
  }
  button:hover:not([disabled]) {
    cursor: pointer;
    background: var(--formsey-widget-background-hover);
  }
  button:focus:not([disabled]) {
    border: 1px solid var(--formsey-border-focus, transparent);
  }
  button:active:not([disabled]) {
    background: var(--formsey-widget-background-hover);
  }
  button:disabled {
    opacity: 0.5;
  }
  button.primary {
    background: var(--formsey-accent-color);
    color: var(--formsey-accent-contrast);
    text-transform: uppercase;
  }
  button.primary:hover {
    background: var(--formsey-accent-hover);
  }

  /* Checkbox Field */
  .cfl {
    height: var(--formsey-input-height, 2em);
    display: flex;
    align-items: center;
  }

  /* Switch field */
  formsey-switch {
    --formsey-switch-size: 2em;
    user-select: none;
  }

  formsey-switch  .swl {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    height: var(--formsey-input-height, 2em);
  }

  formsey-switch .sw {
    position: relative;
    display: inline-block;
    width: var(--formsey-switch-size);
    height: calc(var(--formsey-switch-size) / 2);
    margin-right: 4px;
  }

  formsey-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  formsey-switch .sl {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--formsey-border, inherit);
    background-color: var(--formsey-widget-background-hover, inherit);
    transition: .12s ease-out;
    border-radius:  calc(var(--formsey-switch-size) / 2);
  }

  formsey-switch .sl:before {
    position: absolute;
    content: "";
    height: calc(var(--formsey-switch-size) / 2 - 2px);
    width: calc(var(--formsey-switch-size) / 2 - 2px);
    left: 0px;
    bottom: 0px;
    background-color: white;
    transition: .12s ease-out;
    border-radius: 50%;
  }

  formsey-switch input:checked + .sl {
      background-color: var(--formsey-accent-color,inherit);
  }

  formsey-switch input:disabled + .sl {
    background-color: var(--formsey-background-disabled, inherit);
  }

  formsey-switch input:focus + .sl {
      border: 1px solid var(--formsey-border-focus, inherit);
  }

  formsey-switch input:checked + .sl:before {
    transform: translateX(calc(var(--formsey-switch-size, 60px) / 2));
  }

  /* Checkboxes Field / Multiple Choice Field*/
  formsey-checkboxes .options, formsey-multiple-choice .options, formsey-checkboxes .other, formsey-multiple-choice .other {
    display: flex;
    flex-direction: column;
  }
  formsey-checkboxes .options>div, formsey-multiple-choice .options>div, formsey-checkboxes .other>div, formsey-multiple-choice .other>div {
    line-height: var(--formsey-input-height, 2em);
  }
  formsey-checkboxes label, formsey-multiple-choice label {
    line-height: inherit;
  }
  formsey-checkboxes .other label , formsey-multiple-choice .other label {
    margin-right: .5em;
  }
  formsey-checkboxes .options.horizontal, formsey-multiple-choice .options.horizontal, formsey-checkboxes .other, formsey-multiple-choice .other {
    flex-direction: row;
    align-items: center;
  }
  formsey-checkboxes .options.horizontal div, formsey-multiple-choice .options.horizontal div {
    margin-right: .5em;
  }

  /* Form Field */
  formsey-form-field fieldset {
    padding: 5px;
    border: 0;
    margin: 0;
    min-width: 0;
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

  /* Toolbar */
  .tb .ffg {
    display: inline-flex;
    align-items: center;
  }

  .tb .fff {
    width: initial;
  }

  /* .Color field */
  .cf {
    position: relative;
    width: 100%;
  }

  .cf input[type="text"] {
    text-transform: uppercase;
  }

  .cfp {
    position: absolute;
    top: 0;
    right: 0;
    margin: calc(.4em - 1px);
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    border: 1px solid transparent;
  }

  .cf:focus-within .cfps {
    border: 1px solid var(--formsey-border-focus, #020b2f);
  }

  .cf svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
   }

  /* Labeled field */
  .lfw {
    box-sizing: border-box;
    transition: all 0.2s ease-out;
    display: flex;
    flex-direction: column;
  }

  .lfl {
    display: block;
    position: relative;
    font: var(--formsey-label-font, inherit);
    color: var(--formsey-label-color, inherit);
    padding: var(--formsey-padding, .2em .3em);
    transition: all 0.12s ease-out;
    opacity: 0.8;
  }

  .lfw:focus-within>.lfl {
    color: var(--formsey-accent-color, inherit);
    opacity: 1;
  }

  .lfi {
    background: var(--formsey-error-background, #FF000022);
    border-radius: var(--formsey-border-radius, 0.3em);
    padding: var(--formsey-padding, 0 .3em);
    padding-top: 0;
    padding-bottom: 0;
  }

  .lfr {
    color: var(--formsey-required-color, inherit);
    margin: var(--formsey-padding, .2em .3em);
    font: var(--formsey-required-font, inherit);
    vertical-align: top;
  }

  .lfet, .lfht {
    font: var(--formsey-help-font, inherit);
    font-size: smaller;
    padding: var(--formsey-padding, .2em .3em);
  }

  .lfet {
    color: var(--formsey-error-text-color, #FC0000);
  }

  .lfi .lfr {
    color: var(--formsey-error-text-color, #FC0000);
  }

  .lfht {
    color: var(--formsey-help-text-color, inherit);
    padding: var(--formsey-help-text-padding, var(--formsey-padding, .2em .3em));
    opacity: 0.8;
    transition: opacity 0.12s ease-out;
  }

  .lfw:focus-within .lfht {
    opacity: 1;
  }

  /* Title field */
  formsey-title .lfl, formsey-title .lfht {
    opacity: 1;
    font-size: 1.25em;
    line-height: 1.25em;
    padding: 0;
  }
  formsey-title .lfht {
    font-size: 1.1em;
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
    color: var(--formsey-text-color, #ffffff);
    background: var(--formsey-widget-background, inherit);
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
    box-shadow: var(--formsey-box-shadow);
  }
  formsey-image-checkbox :checked+label>img {
    box-shadow: 0px 0px 3px 0 var(--formsey-text-color);
  }
  formsey-image-checkbox :focus+label {
    transform: scale(.95);
  }
  formsey-image-checkbox :checked+label {
    transform: scale(.9);
  }
  formsey-image-checkbox :focus+label>img {
    opacity: .9;
  }
  formsey-image-checkbox :checked+label::after {
    display:block;
  }

  /* List field */
  formsey-list option {
    background: var(--formsey-background-color);
  }

  /* Sourcecode field */
  formsey-sourcecode .input {
    height: 150px;
    padding: 0;
    overflow: hidden;
  }

  /* Signature field */
  formsey-signature .input {
    position: relative;
    height: 150px;
    max-width: 100%;
  }

  formsey-signature .input:focus-within {
    border: 1px solid var(--formsey-border-focus, #020b2f);
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
    fill: var(--formsey-signature-clear-icon-color, var(--formsey-accent-color, currentColor));
    stroke-width: 0;
    transition: fill 0.12s ease-out;
  }

  formsey-signature svg:hover {
    fill: var(--formsey-accent-color,  #020b2f);
  }

  /* Upload field */
  formsey-upload input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  formsey-upload .input {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 0;
    height: auto;
    min-height: var(--formsey-input-height, 2em);
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
  formsey-upload svg {
    fill: currentColor;
  }
  formsey-upload .prompt span {
    padding-left: 4px;
  }

  formsey-upload .prompt svg {
    width: 1.2em;
    height: 1.2em;
  }

  formsey-upload .files {
    font-size: var(--formsey-files-font-size, smaller);
  }

  formsey-upload .preview, formsey-upload .preview svg {
    max-width: 1.6em;
    max-height: 1.6em;
    width: auto;
    height: auto;
    padding: 0.1em;
  }

  formsey-upload .over {
    border: 1px dashed var(--formsey-accent-color, #999);
    color: var(--formsey-accent-constrast, #999);
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
    top: 2px;
    position: relative;
    fill: currentcolor;
    cursor: pointer;
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

  /* Text field */
  formsey-text .input {
    height: auto;
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
    border-left: 2px solid var(--formsey-widget-background, #E2DDDB);
    font-size: var(--formsey-repeating-section-icon-size, inherit);
    transition: all 0.12s ease-out;
  }
  formsey-repeating-section .form:hover {
    border-left: 2px solid var(--formsey-widget-background-hover, #CAC4C2);
  }
  formsey-repeating-section .fs-remove-wrapper {
    position: absolute;
    line-height: 0;
    padding: 0.4em 0;
    top: calc(50% - 1em);
    left: -0.8em;
  }
  formsey-repeating-section button fs-icon {
    width: 1em;
    height: 1em;
  }
  formsey-repeating-section button {
    color: inherit;
    display: flex;
    width: 1.4em;
    height: 1.4em;
    font-size: var(--formsey-repeating-section-icon-size, inherit);
    border-radius: 50%;
    background-color: var(--formsey-repeating-section-icon-background-color, var(--formsey-widget-background, #E2DDDB));
    transition: background-color 0.12s ease-out;
    border: var(--formsey-input-border, 1px solid transparent);
    padding: 0.15em;
  }
  formsey-repeating-section button:focus {
    outline: none;
    border: 1px solid var(--formsey-border-focus, #020b2f);
  }
  formsey-repeating-section .form:hover .fs-remove-wrapper {
    opacity: 1;
  }
  formsey-repeating-section .form:hover .fs-remove, formsey-repeating-section .fs-add:hover {
    background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--formsey-widget-background-hover, #CAC4C2));
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
    formsey-repeating-section button fs-icon {
      width: 2em;
      height: 2em;
    }
    formsey-repeating-section .fs-remove-wrapper {
      padding: 0.4em 0;
      left: -1em;
      top: calc(50% - 1.375em);
    }
  }

  /* Markdown field */
  pre {
    background: var(--formsey-shade, #80808040);
    border-radius: var(--formsey-border-radius);
    border: 1px solid var(--formsey-border, transparent);
    padding: .5em;
    display:block;
    overflow-x:auto;
    white-space: pre-wrap;
  }
  formsey-markdown .content {
    padding: var(--formsey-padding, .2em .3em);
  }
  formsey-markdown pre {
    margin: .5em 0;
  }
  formsey-markdown p, formsey-markdown ul {
    margin: .25em 0;
  }
  formsey-markdown h1, formsey-markdown h2, formsey-markdown h3, formsey-markdown h4 {
    margin: .5em 0 .25em 0;
    font-weight: bolder;
  }
  formsey-markdown h3 {
    font-size: large;
  }
  formsey-markdown h4 {
    font-size: larger;
  }
  .hljs-subst{
    color:var(--formsey-token-variable, #444)
  }
  .hljs-comment{
      color:var(--formsey-token-comment, #888)
  }
  .hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta-keyword,.hljs-name,.hljs-selector-tag{
      font-weight:bolder
  }
  .hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{
      color:var(--formsey-token-string, #800)
  }
  .hljs-section,.hljs-title{
      color:var(--formsey-token-string, #800);
      font-weight:700
  }
  .hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{
      color: var(--formsey-token-tag, #bc6060)
  }
  .hljs-literal {
      color: var(--formsey-token-constant,#78a960)
  }
  .hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{
      color:var(--formsey-token-keyword, #397300)
  }
  .hljs-meta{
      color:var(--formsey-token-language, #1f7199)
  }
  .hljs-meta-string{
      color:var(--formsey-token-variable, #4d99bf)
  }
  .hljs-emphasis{
      font-style:italic
  }
  .hljs-strong{
      font-weight:bold
  }`