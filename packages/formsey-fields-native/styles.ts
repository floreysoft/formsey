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

  ::-webkit-scrollbar {
    width: .75em;
    height: .75em;
  }
  ::-webkit-scrollbar-track {
      background-color: var(--formsey-background);
  }
  ::-webkit-scrollbar-thumb {
      background-color: var(--formsey-widget-background);
  }
  ::-webkit-scrollbar-thumb:hover {
      background-color: var(--formsey-widget-background-hover);
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
    margin: var(--formsey-space-narrow);
    font: inherit;
    color: inherit;
  }

  input[type="color"] {
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
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
    padding: var(--formsey-space-narrow);
    background: var(--formsey-shade, #80808040);
    border: 1px solid var(--formsey-border, transparent);
    transition: border 0.12s ease-out;
  }

  .input:-webkit-autofill,
  .input:-webkit-autofill:hover,
  .input:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--formsey-color);
    -webkit-box-shadow: 0 0 0px 1000px var(--formsey-shade, #80808040) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .input.range {
    padding: 0;
    margin: 0;
  }

  .input:focus-within {
    border: 1px solid var(--formsey-border-focus, transparent);
  }

  button.input {
    display: flex;
    align-items: center;
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

  /* Panel */
  formsey-panel {
    overflow: hidden;
  }
  formsey-panel header {
    display: flex;
    flex-direction: row;
    padding: var(--formsey-space-wide);
    gap: var(--formsey-space-wide);
    background: var(--formsey-widget-background);
  }
  formsey-panel .panel {
    display: flex;
    flex-grow: 1;
    overflow: auto;
  }

  /* Checkbox Field */
  .cfl {
    height: var(--formsey-input-height, 2em);
    display: flex;
    align-items: center;
  }

  /* Label */
  formsey-label {
    display: flex;
    max-height: 100%;
    overflow: hidden;
  }

  formsey-label .lfw {
    overflow: hidden;
  }

  formsey-label .l {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: var(--formsey-input-height, 2em);
    box-sizing: border-box;
    width: initial;
  }

  formsey-label .l span {
    font: inherit;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-height: 100%;
  }

  formsey-label .l.w span {
    white-space: normal;
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
  formsey-form-field {
    display: flex;
    flex-grow: 1;
  }
  formsey-form-field fieldset {
    padding: 5px;
    border: 0;
    margin: 0;
    min-width: 0;
  }
  .fff {
    display: flex;
    flex-direction: column;
  }
  .ffg {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    gap: var(--formsey-space-narrow);
  }
  formsey-panel,formsey-table,formsey-responsive-panel,formsey-split-panel,formsey-tab-panel,formsey-grid-view,formsey-text,formsey-sourcecode,formsey-signature,formsey-table>.lfw>section, formsey-form-field>.lfw>section, formsey-optional-section>section, formsey-selectable-section>section, formsey-repeating-section>section {
    display: flex;
    position:relative;
    flex-direction: column;
    flex-grow: 1;
  }
  .fbg {
    position: absolute;
    inset: 0px;
    border-radius: inherit;
    pointer-events: none;
  }

  /* Split Panel */
  formsey-split-panel>fs-splitter>div {
    flex-grow: 1;
  }

  /* Color field */
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
    flex-grow: 1;
    max-width: 100%;
  }

  .lfl {
    display: block;
    position: relative;
    font: var(--formsey-label-font, inherit);
    color: var(--formsey-label-color, inherit);
    padding: var(--formsey-space-narrow);
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
    padding: var(--formsey-space-narrow);
    padding-top: 0;
    padding-bottom: 0;
  }

  .lfr {
    color: var(--formsey-required-color, inherit);
    margin: var(--formsey-space-narrow);
    font: var(--formsey-required-font, inherit);
    vertical-align: top;
  }

  .lfet, .lfht {
    font: var(--formsey-help-font, inherit);
    font-size: smaller;
    padding: var(--formsey-space-narrow);
  }

  .lfet {
    color: var(--formsey-error-text-color, #FC0000);
  }

  .lfi .lfr {
    color: var(--formsey-error-text-color, #FC0000);
  }

  .lfht {
    color: var(--formsey-help-text-color, inherit);
    padding: var(--formsey-help-text-padding, var(--formsey-space-narrow));
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
    background: var(--formsey-background);
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

  /* Popup section field */
  formsey-popup-section>.lfw {
    position: relative;
  }
  formsey-popup-section>.lfw>#glass {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--formsey-shade);
    z-index: 2;
  }
  formsey-popup-section>.lfw>#form {
    position: fixed;
    z-index: 3;
    background-color: var(--formsey-background);
    padding: var(--formsey-space-narrow);
    border: 1px solid var(--fs-border-color);
    border-radius: var(--formsey-border-radius);
  }

  /* Text field */
  formsey-text .lfw {
    height: 100%;
  }
  formsey-text .input {
    min-height: 3em;
    flex-grow: 1;
  }

  /* Table */
  formsey-table .ffg {
    display: flex;
    width: inherit;
    flex-grow: 1;
  }
  formsey-table .tw {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 100%;
  }
  formsey-table .b {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--formsey-shade);
    border-radius: var(--formsey-border-radius);
  }
  formsey-table .t {
    display: flex;
    flex-direction: row;
  }
  formsey-table .vscroll {
    overflow-y: auto;
    flex-direction: column;
    display: flex;
    flex-grow: 1;
  }
  formsey-table .scroll {
    overflow-x: auto;
  }
  formsey-table .fixed {
    width: initial;
    border-right: 1px dashed var(--formsey-shade);
  }
  formsey-table .td {
    display: flex;
    flex-direction: row;
    column-gap: .25em;
    align-items: center;
    padding: var(--formsey-space-narrow);
    border-bottom: 1px solid var(--formsey-shade);
    border-left: 1px solid var(--formsey-shade);
  }
  formsey-table .td.first {
    border-left: none;
  }
  formsey-table .td.last {
    border-bottom: none;
  }
  formsey-table .th {
    cursor: pointer;
    max-height: 2em;
  }
  formsey-table .th fs-icon {
    font-size: smaller;
  }
  formsey-table .ts>* {
    flex-grow: 1;
  }
  formsey-table .tnav {
    padding-top: .5em;
  }
  formsey-table .cell {
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Repeating section */
  formsey-repeating-section .form {
    position: relative;
    margin: .25em 0 .25em 1em;
    padding: 0.25em 0px 0.25em 1em;
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
    margin: .25em 0.4em;
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

  /* Layouts, Toggled */
  formsey-layout {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--formsey-space-wide);
    row-gap: var(--formsey-space-narrow);
  }

  formsey-layout fs-toggles {
    --fs-widget-background-color: initial;
    padding:0;
  }

  formsey-layout fs-toggles, formsey-toggles fs-toggles {
    height: var(--formsey-input-height, 2em);
  }

  formsey-layout fs-toggle, formsey-toggle fs-toggle {
    width: 100%;
    min-width: 2em;
    position: relative;
  }

  formsey-layout .ovl {
    position: absolute;
    top: 1px;
    right: 1px;
    width: .5em;
    height: .5em;
    border-radius: 50%;
    background-color: var(--formsey-token-function);
  }
  formsey-layout .ovl.d {
    background-color: var(--formsey-token-library);
  }

  /* Markdown field */
  pre {
    background: var(--formsey-shade, #80808040);
    border-radius: var(--formsey-border-radius);
    border: 1px solid var(--formsey-border, transparent);
    padding: var(--formsey-space-wide);
    display:block;
    overflow-x:auto;
    white-space: pre-wrap;
  }
  formsey-markdown .content {
    padding: var(--formsey-space-narrow);
  }
  formsey-markdown pre {
    margin: var(--formsey-space-wide) 0;
  }
  formsey-markdown p, formsey-markdown ul {
    margin: var(--formsey-space-narrow) 0;
  }
  formsey-markdown h1, formsey-markdown h2, formsey-markdown h3, formsey-markdown h4 {
    margin: var(--formsey-space-wide) 0 var(--formsey-space-narrow) 0;
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