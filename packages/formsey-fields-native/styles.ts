import { css } from "lit";

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

  .light {
    --formsey-elevation-1-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --formsey-elevation-2-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --formsey-elevation-3-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    --formsey-elevation-opacity: 0;
    --formsey-elevation-margin: 0;
    --formsey-elevation-0-opacity: 0%;
    --formsey-elevation-1-opacity: 5%;
    --formsey-elevation-2-opacity: 5%;
    --formsey-elevation-3-opacity: 5%;
  }

  .dark {
    position: relative;
    --formsey-elevation-opacity: 0;
    --formsey-elevation-margin: 0;
    --formsey-elevation-0-opacity: 0;
    --formsey-elevation-1-opacity: 4%;
    --formsey-elevation-2-opacity: 8%;
    --formsey-elevation-3-opacity: 10%;
  }

  ::-webkit-scrollbar {
    width: .75em;
    height: .75em;
  }
  ::-webkit-scrollbar-track {
      background-color: var(--formsey-background);
  }
  ::-webkit-scrollbar-thumb {
      background-color: var(--formsey-surface);
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
    border: 1px solid var(--formsey-accent-color, transparent);
  }

  button {
    display: flex;
    flex-direction: row;
    gap: var(--formsey-space-wide);
    height: var(--formsey-input-height, 2em);
    padding: var(--formsey-space-narrow);
    box-sizing: border-box;
    width: auto;
    position: relative;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    background: var(--formsey-surface);
    border: 1px solid var(--formsey-border, transparent);
    border-radius:var(--formsey-border-radius);
    outline: none;
    color: var(--formsey-color, inherit);
  }
  button.left {
    justify-content: flex-start;
  }
  button fs-icon + span {
    margin-left: .25em;
  }
  button .photo {
    width: 1.5em;
    border-radius: 50%;
    margin-right: var(--formsey-space-wide);
  }

  button:hover:not([disabled]) {
    cursor: pointer;
  }
  button:focus:not([disabled]) {
    border: 1px solid var(--formsey-accent-color, transparent);
  }
  button:disabled {
    opacity: 0.5;
  }
  button.primary {
    background: var(--formsey-accent-color);
    color: var(--formsey-accent-contrast);
    text-transform: uppercase;
  }
  button:active:not([disabled])::before {
    opacity: 0.1;
  }
  .b::before, button::before {
    content: "";
    position: absolute;
    inset: -1px;
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.12s;
  }
  button:hover::before, .b:hover::before {
    opacity: 0.05;
  }
  .hid {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  /* Panel */
  formsey-panel {
    overflow: hidden;
  }
  formsey-panel header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--formsey-space-wide);
    gap: var(--formsey-space-wide);
    background: var(--formsey-surface);
  }
  formsey-panel .panel {
    display: flex;
    flex-grow: 1;
    overflow: auto;
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

  formsey-switch .sl {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--formsey-border, transparent);
    background-color: var(--formsey-surface, inherit);
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
      border: 1px solid var(--formsey-accent-color, transparent);
  }

  formsey-switch input:checked + .sl:before {
    transform: translateX(calc(var(--formsey-switch-size, 60px) / 2));
  }



  /* Checkbox Field */
  .cfl {
    height: var(--formsey-input-height, 2em);
    display: flex;
    align-items: center;
  }

  /* Checkboxes Field / Multiple Choice Field*/
  formsey-checkbox .cm, formsey-multiple-choice .rb {
    display: flex;
    position: relative;
    box-sizing: border-box;
    width: 1.5em;
    height: 1.5em;
    align-items: center;
    justify-content: center;
    border-radius: var(--formsey-border-radius);
    border: 1px solid var(--formsey-border);
    background-color: var(--formsey-shade);
  }
  formsey-checkbox .cm {
    border-radius: var(--formsey-border-radius);
    padding: var(--formsey-space-narrow);
  }
  formsey-multiple-choice .rb, formsey-multiple-choice .r {
    border-radius: 50%;
  }
  formsey-multiple-choice .r {
    background-color: currentColor;
    transition: all 0.2s ease-out;
  }
  formsey-multiple-choice input ~ .rb>.r {
    width: 0;
    height: 0;
  }
  formsey-multiple-choice input:checked ~ .rb>.r {
    width: .65em;
    height: .65em;
  }
  formsey-checkbox input ~ .cm>fs-icon {
    display: none;
  }
  formsey-checkbox input:checked ~ .cm>fs-icon {
    display: block;
  }
  formsey-checkbox .cl, formsey-multiple-choice .rl {
    margin-left: var(--formsey-space-wide);
    user-select: none;
  }
  formsey-checkbox .cm:hover::before, formsey-multiple-choice .rb:hover::before {
    content: "";
    position: absolute;
    inset: -1px;
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0.05;
    transition: opacity 0.12s;
  }
  formsey-checkbox:focus-within input:not([disabled])~.cm, formsey-multiple-choice label:focus-within input:not([disabled]) ~.rb {
    border: 1px solid var(--formsey-accent-color, transparent);
  }

  formsey-checkboxes .options, formsey-multiple-choice .options, formsey-checkboxes .other, formsey-multiple-choice .other {
    display: flex;
    flex-direction: column;
    row-gap: var(--formsey-space-narrow);
  }
  formsey-checkboxes .options .cfl {
    height: auto;
  }
  formsey-checkboxes label, formsey-multiple-choice label {
    display: flex;
    align-items: center;
    line-height: inherit;
  }
  formsey-checkboxes .other label , formsey-multiple-choice .other label {
    margin-right: .5em;
  }
  formsey-checkboxes .options.horizontal, formsey-multiple-choice .options.horizontal, formsey-checkboxes .other, formsey-multiple-choice .other {
    flex-direction: row;
    align-items: center;
  }
  formsey-checkboxes .options.horizontal, formsey-multiple-choice .options.horizontal {
    height: var(--formsey-input-height, 2em);
  }
  formsey-checkboxes .options.horizontal div, formsey-multiple-choice .options.horizontal div {
    margin-right: .5em;
  }

  /* Form Field */
  formsey-form-field fieldset {
    padding: 0;
    border: 0;
    margin: 0;
    min-width: 0;
  }
  .ffg {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: var(--formsey-space-narrow);
    overflow: hidden;
  }
  .fbg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-color: currentColor;
    opacity: 0;
  }
  .fff {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    --formsey-elevation-opacity: 0;
    --formsey-elevation-margin: 0;
  }

  /* Option */
  formsey-option>button.c:not([disabled])::before {
    opacity: 0.1;
  }
  formsey-option>button>.cm {
    padding: var(--formsey-space-narrow);
    width: 1em;
  }

  /* Combobox, Listbox */
  formsey-popup-section, formsey-select, formsey-dialog-section {
    position: relative;
  }

  /* NumberUnit */
  formsey-numberunit>.lfw>.nu {
    display: flex;
  }
  formsey-numberunit>.lfw>.nu>formsey-number {
    flex-grow: 1;
  }
  formsey-numberunit>.lfw>.nu>formsey-number>.lfw>input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  formsey-numberunit>.lfw>.nu>formsey-toggle>.lfw>div>button:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  formsey-numberunit>.lfw>.nu>formsey-toggle {
    flex-grow: 0;
  }

  formsey-select button.input {
    justify-content: left;
  }

  formsey-combobox .popup, formsey-select .popup {
    display: flex;
    overflow: hidden;
    width: 100%;
    z-index: 8;
    position: fixed;
    background: var(--formsey-background);
    max-height: 50vh;
  }

  formsey-option .label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  formsey-option .label b {
    font-weight: bolder;
  }

  /* Expand various items */
  formsey-toggle,formsey-list,formsey-option,formsey-panel,formsey-panel>div,formsey-table,formsey-responsive-panel,formsey-split-panel,formsey-tabs,formsey-grid-view,formsey-stats-view,formsey-text,formsey-sourcecode,formsey-signature,formsey-table>.lfw>section,formsey-form-field,formsey-form-field-designer,formsey-form-field-designer>.lfw>section,formsey-form-field>.lfw>section, formsey-optional-section>section, formsey-selectable-section>section, formsey-repeating-section>section {
    display: flex;
    position:relative;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  formsey-string {
    flex-grow: 1;
  }

  /* Tabs panel */
  formsey-tabs .container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }
  formsey-tabs .tabs {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  formsey-tabs .tab {
    border-color: transparent;
  }
  formsey-tabs .top  .tab {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
  }
  formsey-tabs .bottom .tab {
    border-radius: 0;
    border-top: none;
  }
  formsey-tabs .tab.expand {
    flex-grow: 1;
    justify-content: center;
    text-align: center;
  }
  formsey-tabs .tab.selected::before {
    opacity: 0;
  }
  formsey-tabs .tab.selected::after {
    content:"";
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    height: 2px;
    background-color: var(--formsey-accent-color);
  }
  formsey-tabs .content {
      flex-grow: 1;
      display: flex;
      background-color: var(--formsey-surface);
  }

  /* Stats View */
  formsey-stats-view .statistics {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }

  formsey-stats-view .statistics formsey-stats {
    flex-grow: 1;
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
    border: 1px solid var(--formsey-accent-color, #020b2f);
  }

  .cf svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
   }

  /* Labeled field */
  .lfw {
    box-sizing: border-box;
    transition: color 0.2s ease-out;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
  }

  .lfl {
    display: block;
    position: relative;
    font: var(--formsey-label-font, inherit);
    color: var(--formsey-label-color, inherit);
    padding: var(--formsey-space-narrow);
    transition: color 0.12s ease-out;
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
    background: var(--formsey-surface, inherit);
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
  formsey-list .options {
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid var(--formsey-border, transparent);
    border-radius: var(--formsey-border-radius);
  }
  formsey-list formsey-option>button {
    border-color: transparent;
  }
  formsey-list formsey-option:not(:first-child)>button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  formsey-list formsey-option:not(:last-child)>button {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
    border: 1px solid var(--formsey-accent-color, #020b2f);
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

  /* Popup / Dialog section field */
  formsey-popup-section>.lfw,   formsey-dialog-section>.lfw {
    position: relative;
    overflow: visible;
  }
  formsey-popup-section>.lfw>#glass, formsey-dialog-section>.lfw>#glass, formsey-dialog-section .dialogWrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--formsey-shade);
    z-index: 8;
  }
  formsey-dialog-section .dialogWrapper {
    background-color: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
  }
  formsey-dialog-section .dialog>header {
    color: var(--formsey-accent-contrast);
    background: var(--formsey-accent-color);
    padding: var(--formsey-space-wide);
    cursor: move;
  }

  formsey-dialog-section .dialog>footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    column-gap: var(--formsey-space-narrow);
    padding: var(--formsey-space-wide);
  }
  formsey-popup-section>.lfw>#form {
    position: fixed;
  }

  formsey-popup-section>.lfw>#form, formsey-dialog-section .dialog {
    z-index: 10;
    background-color: var(--formsey-background);
    border: 1px solid var(--formsey-border-color);
    border-radius: var(--formsey-border-radius);
    overflow: visible;
  }
  formsey-dialog-section .dialog {
    min-height: 10em;
    min-width: 10em;
    max-width: 100vw;
    max-height: 100vh;
    box-shadow: var(--formsey-elevation-2-shadow, none);
    display: flex;
    flex-direction: column;
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
    overflow: hidden;
  }
  formsey-table .tb {
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    border: 1px solid var(--formsey-shade);
    border-radius: var(--formsey-border-radius);
    max-width: 100%;
  }
  formsey-table .t {
    display: flex;
    flex-direction: row;
  }
  formsey-table .vscroll {
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    display: flex;
    flex-grow: 1;
  }
  formsey-table .scroll {
    overflow-x: auto;
    flex-grow: 1;
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
  formsey-table .td.selected {
    background-color: var(--formsey-shade);
  }
  formsey-table .th {
    cursor: pointer;
    max-height: 2em;
    font-weight: 500;
  }
  formsey-table .th.sort {
    color: var(--formsey-accent-color)
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

  /* Toggles */
formsey-toggle>.lfw>div {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}
formsey-toggle>.lfw>div>button {
  border-radius: 0;
  border-right-color: transparent;
  flex-grow: 1;
}
formsey-toggle>div>button:disabled {
  cursor: default;
  color: var(--formsey-color-disabled);
}
formsey-toggle>.lfw>div>button:first-child {
    border-top-left-radius: var(--formsey-border-radius);
    border-bottom-left-radius: var(--formsey-border-radius);
}
formsey-toggle>.lfw>div>button:last-child {
    border-top-right-radius: var(--formsey-border-radius);
    border-bottom-right-radius: var(--formsey-border-radius);
    border-right-color: var(--formsey-border);
}
formsey-toggle>.lfw>div>button:last-child:last-child:focus-within {
    border-right-color: var(--formsey-accent-color);
}
formsey-toggle>.lfw>div>button[selected]:not([disabled]) {
  color: var(--formsey-accent-contrast);
  background-color: var(--formsey-accent-color);
}
formsey-toggle>.lfw>div>button[selected]:not([disabled])::before {
  opacity: 0.1;
}

@media (pointer: coarse) {
  formsey-toggle {
        margin: 0.25em;
    }
}

  /* Selectable section */
  formsey-selectable-section>section>.lfw {
    flex-grow: 0;
  }
  formsey-selectable-section>section>.form {
    flex-grow: 1;
  }

  /* Repeating section */
  formsey-repeating-section>section>.lfw>div>.form {
    position: relative;
    margin: .25em 0 .25em 1em;
    padding: 0.25em 0px 0.25em 1em;
    border-left: 2px solid var(--formsey-surface, #E2DDDB);
    font-size: var(--formsey-repeating-section-icon-size, inherit);
    transition: all 0.12s ease-out;
  }
  formsey-repeating-section>section>.lfw>div>.form:hover {
    border-left: 2px solid var(--formsey-surface, #CAC4C2);
  }
  formsey-repeating-section>section>.lfw>div>.form>.fs-remove-wrapper {
    position: absolute;
    line-height: 0;
    padding: 0.4em 0;
    top: calc(50% - 1em);
    left: -0.8em;
  }
  formsey-repeating-section>section>.lfw>div>.form>.fs-remove-wrapper>button fs-icon, formsey-repeating-section>section>.lfw>.fs-add fs-icon {
    width: 1em;
    height: 1em;
  }
  formsey-repeating-section>section>.lfw>div>.form>.fs-remove-wrapper>button,formsey-repeating-section>section>.lfw>.fs-add {
    color: inherit;
    display: flex;
    width: 1.4em;
    height: 1.4em;
    font-size: var(--formsey-repeating-section-icon-size, inherit);
    border-radius: 50%;
    background-color: var(--formsey-repeating-section-icon-background-color, var(--formsey-surface, #E2DDDB));
    transition: background-color 0.12s ease-out;
    border: var(--formsey-input-border, 1px solid transparent);
    padding: 0.15em;
  }
  formsey-repeating-section>section>.lfw>div>.form>.fs-remove-wrapper>button:focus, formsey-repeating-section>section>.lfw>.fs-add:focus {
    outline: none;
    border: 1px solid var(--formsey-accent-color, #020b2f);
  }
  formsey-repeating-section>section>.lfw>div>.form:hover>.fs-remove-wrapper {
    opacity: 1;
  }
  formsey-repeating-section>section>.lfw>div>.form:hover>.fs-remove-wrapper>.fs-remove, formsey-repeating-section>section>.lfw>.fs-add:hover {
    background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--formsey-surface, #CAC4C2));
  }
  formsey-repeating-section>section>.lfw>.fs-add {
    margin: .25em 0.4em;
  }

  @media (pointer: coarse) {
    formsey-repeating-section>section>.lfw>div>.form {
      padding: 0 0 0 1.5em;
      margin: .25em 0 .25em 1em;
    }
    formsey-repeating-section>section>.lfw>div>.form>.fs-remove-wrapper>button,formsey-repeating-section>section>.lfw>.fs-add fs-icon {
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
  }

  formsey-layout>.lfw>.toggles {
    display: flex;
    flex-direction: row;
    column-gap: var(--formsey-space-wide);
    row-gap: var(--formsey-space-narrow);
    flex-wrap: wrap;
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

  /* Login field */
  formsey-profile .photo {
      width: 2em;
      height: auto;
      margin-right: var(--formsey-space-wide);
      margin-left: -.25em;
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
    color:var(--formsey-text)
  }
  .hljs-comment{
    color:var(--formsey-palette-3)
  }
  .hljs-attribute,.hljs-doctag,.hljs-keyword,.hljs-meta-keyword,.hljs-name,.hljs-selector-tag{
    color:var(--formsey-palette-5)
  }
  .hljs-deletion,.hljs-number,.hljs-quote,.hljs-selector-class,.hljs-selector-id,.hljs-string,.hljs-template-tag,.hljs-type{
      color:var(--formsey-palette-1)
  }
  .hljs-section,.hljs-title{
      color:var(--formsey-palette-1);
      font-weight:700
  }
  .hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-symbol,.hljs-template-variable,.hljs-variable{
      color: var(--formsey-palette-2);
  }
  .hljs-literal {
      color: var(--formsey-palette-3);
  }
  .hljs-addition,.hljs-built_in,.hljs-bullet,.hljs-code{
      color:var(--formsey-palette-3);
  }
  .hljs-meta{
      color:var(--formsey-palette-4);
  }
  .hljs-meta-string{
      color:var(--formsey-palette-4);
  }
  .hljs-emphasis{
      font-style:italic
  }
  .hljs-strong{
      font-weight:bold
  }`