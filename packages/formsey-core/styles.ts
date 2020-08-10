import { css } from 'lit-element';

export default css`
    button {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      justify-content: center;
    }
    button:hover:not([disabled]) {
      cursor: pointer;
      background-color: var(--fs-widget-background-color-hover);
    }
    button:focus:not([disabled]) {
      border-color: var(--fs-border-color-focus);
    }
    button:active:not([disabled]) {
      background-color: var(--fs-widget-background-color-selected);
    }
    button:disabled {
      opacity: 0.5;
    }
    button.primary {
      background-color: var(--fs-accent-color);
      color: var(--fs-accent-color-text);
      text-transform: uppercase;
    }
    button.primary:hover {
      background-color: var(--fs-accent-color-hover);
    }

    input[type="checkbox"], input[type="radio"] {
      margin: var(--fs-widget-padding, 0 .5em 0 0);
      font-family: var(--formsey-font-family, var(--fs-font-family, inherit));
      font-size: var(--formsey-font-size, var(--fs-font-size, inherit));
      color: var(--formsey-text-color, var(--fs-text-color, inherit));
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
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }

    .input {
      user-select: auto;
      outline: none;
      box-sizing: border-box;
      width: 100%;
      height: var(--formsey-input-height, 2em);
      font-family: var(--formsey-font-family, var(--fs-font-family, inherit));
      font-size: var(--formsey-font-size, var(--fs-font-size, inherit));
      color: var(--formsey-text-color, var(--fs-text-color, inherit));
      font-weight: var(--formsey-font-weight, var(--fs-font-weight, inherit));
      border-radius: var(--formsey-input-border-radius, var(--fs-border-radius, 3px));
      padding: var(--formsey-input-padding, var(--fs-widget-padding, .2em .3em));
      background: var(--formsey-input-background, var(--fs-widget-background-color-alpha, #99999920));
      border: var(--formsey-input-border, 1px solid transparent);
      transition: border 0.12s ease-out;
    }

    .input:focus-within {
      border: 1px solid var(--formsey-border-color-focus, var(--fs-border-color-focus, #020b2f));
    }

    /* Boolean Field */
    .bfl {
      height: var(--formsey-input-height, 2em);
    }

    /* Checkboxes Field / Multiple Choice Field*/
    formsey-checkboxes .options, formsey-multiple-choice .options {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 4px;
    }
    formsey-checkboxes .other, formsey-multiple-choice .other {
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-gap: 2em;
      align-items: center;
    }

    /* Form Field */
    formsey-form-field fieldset {
      padding: 5px;
      border: 0;
      margin: 0;
      min-width: 0;
    }
    .fft {
      font-size: var(--formsey-title-font-size, larger);
      font-family: var(--formsey-title-font-family, var(--formsey-font-family, inherit));
      font-weight: var(--formsey-title-font-weight, inherit);
      line-height: var(--formsey-title-line-height, inherit);
      color: var(--formsey-title-color, inherit);
      margin: var(--formsey-title-margin, 12px 0 4px 0);
      padding: 0;
    }
    .ffd {
      font-size: var(--formsey-description-font-size, inherit);
      font-family: var(--formsey-description-font-family, var(--formsey-font-family, inherit));
      font-weight: var(--formsey-description-font-weight, inherit);
      line-height: var(--formsey-description-line-height, inherit);
      color: var(--formsey-description-color, inherit);
      margin: var(--formsey-description-margin, 12px 0 4px 0);
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

    /* Nested form field */
    .nf .fft {
      margin: var(--formsey-selectable-title-margin, var(--fs-widget-padding, 4px 0 0 0));
      font-size: var(--formsey-selectable-title-font-size, larger);
    }

    .nf  .ffd {
      font-size: var(--formsey-selectable-description-font-size, inherit);
      margin: var(--formsey-selectable-description-margin, var(--fs-widget-padding, 4px 0 0 0));
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
      border-color: var(--formsey-border-color-focus, var(--fs-border-color-focus, #020b2f));
    }

    .cf svg {
      width: 1.2em;
      height: 1.2em;
     }

    /* Labeled field */
    .lfw {
      box-sizing: border-box;
      transition: all 0.2s ease-out;
      display: flex;
      flex-direction: column;
    }

    .lfl {
      position: relative;
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

    .lfw:focus-within>.lfl {
      color: var(--formsey-primary-color, var(--fs-accent-color, inherit));
      opacity: 1;
    }

    .lfi {
      background-color: var(--formsey-invalod_color, var(--fs-background-color-error, #AA000044));
      padding: 0 0.5em 0.1em;
      border-radius: var(--formsey-invalid-border-radius, var(--fs-border-radius-m, 0.3em));
    }

    .lfr {
      color: var(--formsey-required-color, var(--fs-text-color-error));
      margin: var(--formsey-required-margin, var(--fs-widget-padding, 0 0 0 4px));
      font-family: var(--formey-required-font-family, var(--formsey-font-family, inherit));
      font-size: var(--formey-required-font-size, smaller);
      line-height: var(--formsey-required-line-height, inherit);
      vertical-align: top;
    }

    .lfet, .lfht {
      font-family: var(--formey-help-text-font-family, var(--formsey-font-family, inherit));
      font-size: var(--formey-help-text-font-size, smaller);
      line-height: var(--formsey-help-text-line-height, inherit);
      margin: var(--formsey-help-text-margin, 1px 0 0 0);
    }

    .lfet {
      color: var(--formsey-error-text-color, var(--lumo-error-text-color, #FC0000));
    }

    .lfhtb {
      position: absolute;
      left: var(--formsey-padding);
      bottom: 1.8em;
      z-index: 1;
      color: var(--formsey-help-text-color, var(--fs-text-color, inherit));
      border: 1px solid var(--formsey-border-color);
      border-radius: var(--fs-border-radius);
      background: var(--fs-widget-background-color);
      padding: var(--formsey-padding);
      opacity: 0;
      transition: all 0.12s ease-out;
    }

    .lfw:focus-within .lfhtb {
      opacity: 1;
    }

    .lfht {
      color: var(--formsey-help-text-color, inherit);
      padding: var(--formsey-help-text-padding, var(--fs-widget-padding, 4px 0 0 0));
      opacity: 0.8;
      transition: opacity 0.12s ease-out;
    }

    .lfw:focus-within .lfht {
      opacity: 1;
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
    formsey-signature .input {
      position: relative;
      height: 150px;
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

    /* Repeating section */
    formsey-repeating-section .form {
      position: relative;
      margin: 0.5em 0 0 0.8em;
      padding: 0 0 5px 15px;
      border-left: 2px solid var(--fs-widget-background-color, #E2DDDB);
      font-size: var(--formsey-repeating-section-icon-size, inherit);
      transition: all 0.12s ease-out;
    }
    formsey-repeating-section .form:hover {
      border-left: 2px solid var(--fs-widget-background-color-hover, #CAC4C2);
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
      fill: var(--formsey-repeating-section-icon-fill-color, var(--fs-text-color, currentColor));
    }
    formsey-repeating-section button {
      display: flex;
      width: 1.4em;
      height: 1.4em;
      font-size: var(--formsey-repeating-section-icon-size, inherit);
      border-radius: 50%;
      background-color: var(--formsey-repeating-section-icon-background-color, var(--fs-widget-background-color, #E2DDDB));
      transition: background-color 0.12s ease-out;
      border: var(--formsey-input-border, 1px solid transparent);
      padding: 0.2em;
    }
    formsey-repeating-section button:focus {
      outline: none;
      border: 1px solid var(--formsey-border-color-focus, var(--fs-border-color-focus, #020b2f));
    }
    formsey-repeating-section .form:hover .fs-remove-wrapper {
      opacity: 1;
    }
    formsey-repeating-section .form:hover .fs-remove, formsey-repeating-section .fs-add:hover {
      background-color: var(--formsey-repeating-section-icon-hover-background-color, var(--fs-widget-background-color-hover, #CAC4C2));
    }
    formsey-repeating-section .fs-add {
      margin: 0.2em 0.1em 0.1em;
    }

    /* Selectable section */
    formsey-selectable-section .fft {
      margin: var(--formsey-selectable-title-margin, var(--fs-widget-padding, 4px 0 0 0));
      font-size: var(--formsey-selectable-title-font-size, larger);
    }

    formsey-selectable-section .ffd {
      font-size: var(--formsey-selectable-description-font-size, inherit);
      margin: var(--formsey-selectable-description-margin, var(--fs-widget-padding, 4px 0 0 0));
    }

    /* Section field */
    formsey-section header {
      background-color: var(--lumo-primary-color);
      padding: var(--lumo-space-xs) var(--lumo-space-m);
      margin-top: var(--lumo-space-s);
      clip-path: polygon(5px 0, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
    }

    formsey-section footer {
      padding: var(--lumo-space-s) 0 0 0;
    }
    `