import '@vaadin/vaadin-icons/vaadin-icons.js';
import { LitElement, TemplateResult, html, property, customElement } from 'lit-element';
import { ValueChangedEvent, ComplexField, FieldFactory, FieldDefinition, FormDefinition, EditorDefinition } from '@formsey/core';

class ChangeEvent extends Event {
  index: number
  definition: FieldDefinition

  constructor(index: number, definition: FieldDefinition) {
    super("cellChanged");
    this.index = index
    this.definition = definition
  }
}

class SplitEvent extends Event {
  left: number
  right: number
  index: number

  constructor(index: number, left: number, right: number) {
    super("cellSplit");
    this.index = index;
    this.left = left
    this.right = right
  }
}

@customElement("formsey-field-cell")
export class FormFieldCell extends LitElement {
  @property({ converter: Object })
  set definition(definition: FieldDefinition) {
    this._definition = definition;
    if (definition.type) {
      this.editor = this.factory.edit(definition.type);
      this.edit = (typeof this.edit == "undefined" ? true : this.edit);
    }
    this.requestUpdate()
  }

  get definition() {
    return this._definition;
  }

  factory: FieldFactory
  row: number
  column: number

  private readonly MIN_COLS: number = 2;
  private readonly splitDelay: number = 1000;
  private _definition: FieldDefinition;
  private editor: EditorDefinition;
  private value: FieldDefinition;
  private cancelValue: FieldDefinition;
  private edit: boolean
  private requestId;
  private start;
  private splitEvent: SplitEvent;

  constructor() {
    super()
    this.edit = false
  }

  render() {
    let content: TemplateResult
    if (this.definition.type) {
      if (this.edit) {
        let disabled = (typeof this.editor.named == "undefined" || this.editor.named) && (typeof this.value == "undefined" || typeof this.value.name == "undefined" || this.value.name.length == 0)
        content = html`<div class="fs-field-editor" @keyup="${this.keyUp}"><header>${this.definition.type}</header><section>${this.factory.create(this.editor, this.value, (event: ValueChangedEvent<FormDefinition>) => this.valueChanged(event))}</section><footer><vaadin-button @click="${this.editEnd}" ?disabled="${disabled}" theme="primary">OK</vaadin-button><vaadin-button theme="tertiary" id="cancelButton" @click="${this.editCancel}">Cancel</vaadin-button>
    </footer></div>`;
      } else {
        content = html`
      <div class="fs-preview" draggable="true" tabindex="0" @click="${this.editStart}"  @dragstart="${this.dragStart}" @dragenter="${this.dragEnter}" @dragleave="${this.dragLeave}" @dragend="${this.dragEnd}" @dragover="${this.dragOver}" @drop="${this.drop}">
      <div class="fs-glass" ></div>
      <div class="fs-editor">${this.factory.create(this.definition, this.definition.default, null)}</div>
      </div>
      </div>`;
      }
    } else {
      let cutMarkers: TemplateResult[] = []
      for (let i = this.MIN_COLS; i < (this.definition.colspan || 12); i++) {
        if ((this.definition.colspan || 12) - i >= this.MIN_COLS) {
          let position = (i / (this.definition.colspan || 12) * 100);
          cutMarkers.push(html`<div class="fs-marker" style="left:${position}%" @dragleave="${this.cancelSplit}" @dragover="${(event: SplitEvent) => this.split(new SplitEvent(this.column, i, (this.definition.colspan || 12) - i))}"  @click="${e => this.dispatchEvent(new SplitEvent(this.column, i, (this.definition.colspan || 12) - i))}"></div>`);
        }
      }
      content = html`<div class="fs-cell" @drop="${this.drop}" @dragover="${this.dragOver}" @dragenter="${this.dragEnter}" @dragleave="${this.dragLeave}">${cutMarkers}</div>`;
    }
    return html`
    <style>
    .fs-field-editor {
      border: 1px solid var(--lumo-shade-10pct);
      box-sizing: border-box;
      background-color: var(--lumo-shade-5pct);
      margin-bottom: 10px;
      box-shadow: 0 0 3px var(--lumo-primary-color-50pct);
    }
    .fs-field-editor section {
      padding: var(--lumo-space-s);
    }
    .fs-field-editor footer {
      text-align: right;
      padding: var(--lumo-space-s);
    }
    .fs-field-editor header {
      padding: var(--lumo-space-s);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      color: var(--lumo-primary-color);
      border-bottom: 1px solid var(--lumo-shade-10pct);
    }
    #cancelButton {
      margin-left:  var(--lumo-space-s);
    }
    .fs-preview {
      position: relative;
      cursor: move;
      transition: background-color 0.2s;
      background: transparent;
    }
    .fs-preview:focus {
      outline: none;
    }
    .fs-glass {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--lumo-primary-color);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .fs-glass:hover {
      opacity: 0.05;
    }
    .fs-cell {
      display: flex;
      flex-direction: column;
      position: relative;
      --lumo-button-size: var(--lumo-size-m);
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      font-weight: 500;
      color: var(--lumo-primary-text-color);
      min-height: var(--lumo-button-size);
      margin: var(--lumo-space-xs) 0;
      border-radius: var(--lumo-border-radius);
      border: 1px dashed var(--lumo-primary-color-50pct);
      background-color: var(--lumo-base-color);
      transition: all 0.2s;
    }
    .fs-cell.fs-over {
      border: 1px dashed var(--lumo-primary-color);
      background-color: var(--lumo-primary-color-10pct);
    }
    .fs-marker {
      position: absolute;
      opacity: 0;
      top: 0;
      bottom: 0;
      margin: -1px 0;
      background-color: white;
      transition: opacity 0.2s;
    }
    .fs-cell:hover .fs-marker,  .fs-cell.fs-over .fs-marker {
      opacity: 1;
    }
    .fs-marker::before, .fs-marker::after {
      content: ' ';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 10px;
    }
    .fs-marker::before {
      left: -10px;
      border-right: 1px dashed var(--lumo-primary-color-50pct);
    }
    .fs-marker:hover {
      cursor: col-resize;
    }
    .fs-form-field {
      display: flex;
      flex-direction: column;
    }
    .fs-prompt {
      user-select: none;
      flex: 0 0;
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
    }
    .fs-help-text {
      user-select: none;
      flex: 1 0;
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-s);
    }
    .fs-editor {
      flex: 0 0;
      margin-bottom: 6px;
      pointer-events: none;
    }
    </style>
    ${content}`;
  }

  protected valueChanged(e: ValueChangedEvent<FormDefinition>) {
    this.value = e.value;
    if ((typeof this.editor.named == "undefined" || this.editor.named) && this.value.prompt) {
      let convertedName = this.value.prompt.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
      convertedName = convertedName.replace(/[^\w\s]/gi, '');
      this.value.name = convertedName;
    }
    this.requestUpdate()
  }

  protected keyUp(e: KeyboardEvent) {
    if (e.key === "Enter") {
      /*
      TODO: Avoid return if OK not active or cursor in multiline-fields
      this.editEnd(e);
      e.stopPropagation();
      */
    }
  }

  protected editStart(e: any) {
    this.value = { ...this.definition };
    this.cancelValue = { ...this.definition };
    this.edit = true;
    this.cancelSplit(e);
    this.requestUpdate();
  }

  protected editCancel(e: any) {
    this.edit = false;
    this.definition = this.cancelValue;
    this.dispatchEvent(new ChangeEvent(this.column, this.cancelValue));
    this.requestUpdate();
  }

  protected editEnd(e: any) {
    this.definition = this.value;
    this.edit = false;
    this.dispatchEvent(new ChangeEvent(this.column, this.definition));
  }

  protected dragEnter(e: any) {
    e.currentTarget.classList.add('fs-over');
  }

  protected dragLeave(e: any) {
    this.cancelSplit(e);
    e.currentTarget.classList.remove('fs-over');
    e.stopPropagation();
  }

  protected dragOver(e: DragEvent) {
    if (e.currentTarget) {
      (<HTMLElement>e.currentTarget).classList.add('fs-over');
      e.preventDefault();
    }
  }

  protected dragStart(e) {
    if (this.shadowRoot) {
      const node = this.shadowRoot.querySelector(".fs-preview") as HTMLElement;
      if (node) {
        e.dataTransfer.setData("text", JSON.stringify(this.definition));
        e.dataTransfer.effectAllowed = "move";
        this.requestUpdate();
        const that = this;
        const empty = { colspan: this.definition.colspan };
        setTimeout(function () {
          that.definition = empty
          that.dispatchEvent(new ChangeEvent(that.column, empty));
        }, 1);
      }
    }
  }

  protected dragEnd(e) {
    this.cancelSplit(e);
  }

  protected drop(e: any) {
    this.edit = true;
    this.cancelValue = { ...this.definition };
    let definition = JSON.parse(e.dataTransfer.getData("text")) as FieldDefinition;
    this.definition = { ...definition, colspan: this.definition.colspan }
    this.value = { ...this.definition };
    this.cancelSplit(e);
    if (this.definition.name) {
      this.dispatchEvent(new ChangeEvent(this.column, this.definition));
    }
  }

  protected split(splitEvent: SplitEvent): any {
    if (!this.requestId) {
      this.start = Date.now();
      this.splitEvent = splitEvent;
      this.requestId = window.requestAnimationFrame(this.delay);
    }
  }

  protected cancelSplit(e: any) {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }

  delay = () => {
    if (Date.now() - this.start > this.splitDelay) {
      this.requestId = undefined;
      this.dispatchEvent(this.splitEvent);
    } else {
      this.requestId = window.requestAnimationFrame(this.delay);
    }
  }
}

@customElement("formsey-fields")
export class FieldsField extends ComplexField<FormDefinition, FieldDefinition[]> {
  animations: number[] = []

  @property({ converter: Object })
  value: FieldDefinition[]

  renderStyles() {
    return `:host {
      display: block;
      outline: none;
      background-color: var(--lumo-base-color);;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      padding: 10px 10px 5px;
    }
    vaadin-button {
      min-width: 0
    }
    .fs-row, .fs-tmp {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 36px;
      grid-auto-flow: dense;
      grid-gap: 5px;
    }
    .fs-cell {
      position: relative;
    }
    .fs-marker {
      z-index: 1;
      opacity: 0;
      background-color: var(--lumo-primary-color-10pct);
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      right: 0;
      margin: 2px -12px 2px 0;
      border-radius: var(--lumo-border-radius);
      transition: opacity 0.2s;
    }
    .fs-marker:hover {
      opacity: 1;
      cursor: ew-resize;
    }
    .fs-actions {
      text-align: center;
    }
    .colspan-2 {
      grid-column-end: span 2;
    }
    .colspan-3 {
      grid-column-end: span 3;
    }
    .colspan-4 {
      grid-column-end: span 4;
    }
    .colspan-5 {
      grid-column-end: span 5;
    }
    .colspan-6 {
      grid-column-end: span 6;
    }
    .colspan-7 {
      grid-column-end: span 7;
    }
    .colspan-8 {
      grid-column-end: span 8;
    }
    .colspan-9 {
      grid-column-end: span 9;
    }
    .colspan-10 {
      grid-column-end: span 10;
    }
    .colspan-12 {
      grid-column-end: span 12;
    }

    .removeRow {
      padding: var(--lumo-space-xs) 0;
    }

    .removeRow button {
      border-radius: var(--lumo-border-radius);
      border: 1px dashed var(--lumo-primary-color-50pct);
      background: none;
      height: 100%;
      color: var(--lumo-error-color);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .removeRow button:hover {
      background-color: var(--lumo-primary-color-10pct);
    }
    .addRow {
      width: 100%;
      text-align: center;
    }

    .addRow button {
      border-radius: var(--lumo-border-radius);
      border: 1px dashed var(--lumo-primary-color-50pct);
      background: none;
      padding: 0 var(--lumo-space-l);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .addRow button:hover {
      background-color: var(--lumo-primary-color-10pct);
    }

    @media only screen and (max-width: 720px)  {
      .colspan-2, .colspan-3, .colspan-4, .colspan-5, .colspan-6, .colspan-7, .colspan-8, .colspan-9, .colspan-10 {
        grid-column-end: span 12;
      }
    }

    .animation-target {
      animation: animation 1000ms linear both;
    }

    @keyframes grow {
      0% { max-height:0px; transform: scale(0.2,0.5) }
      100% { max-height:100px; transform: scale(1,1) }
    }

    @keyframes animation {
      0% { -webkit-transform: matrix3d(0.95, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.95, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      3.4% { -webkit-transform: matrix3d(0.966, 0, 0, 0, 0, 0.881, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.966, 0, 0, 0, 0, 0.881, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      4.7% { -webkit-transform: matrix3d(0.972, 0, 0, 0, 0, 0.92, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.972, 0, 0, 0, 0, 0.92, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      6.81% { -webkit-transform: matrix3d(0.983, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.983, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      9.41% { -webkit-transform: matrix3d(0.994, 0, 0, 0, 0, 1.034, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.994, 0, 0, 0, 0, 1.034, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      10.21% { -webkit-transform: matrix3d(0.997, 0, 0, 0, 0, 1.045, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.997, 0, 0, 0, 0, 1.045, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      13.61% { -webkit-transform: matrix3d(1.006, 0, 0, 0, 0, 1.066, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.006, 0, 0, 0, 0, 1.066, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      14.11% { -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 1.066, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.007, 0, 0, 0, 0, 1.066, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      17.52% { -webkit-transform: matrix3d(1.01, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      18.72% { -webkit-transform: matrix3d(1.011, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.011, 0, 0, 0, 0, 1.037, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      21.32% { -webkit-transform: matrix3d(1.01, 0, 0, 0, 0, 1.014, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.01, 0, 0, 0, 0, 1.014, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      24.32% { -webkit-transform: matrix3d(1.008, 0, 0, 0, 0, 0.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.008, 0, 0, 0, 0, 0.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      25.23% { -webkit-transform: matrix3d(1.007, 0, 0, 0, 0, 0.988, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.007, 0, 0, 0, 0, 0.988, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      29.03% { -webkit-transform: matrix3d(1.003, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.003, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      29.93% { -webkit-transform: matrix3d(1.002, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1.002, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      35.54% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 0.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 0.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      36.74% { -webkit-transform: matrix3d(0.999, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.999, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      41.04% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      44.44% { -webkit-transform: matrix3d(0.998, 0, 0, 0, 0, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(0.998, 0, 0, 0, 0, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      52.15% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      59.86% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      63.26% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 0.998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      75.28% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      85.49% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      90.69% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      100% { -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    }`;
  }

  renderField() {
    let columns = 0;
    let rows: TemplateResult[] = [];
    let cols: TemplateResult[] = [];
    let row = 0;
    if (!this.value) {
      if (this.definition.default) {
        this.value = this.definition.default
      } else {
        this.value = [{}];
      }
    }
    for (let column = 0; column < this.value.length; column++) {
      let field = { ...this.value[column] };
      columns += (field.colspan ? field.colspan : 12);
      if (columns >= 12) {
        row = column;
      }
      let marker = columns < 12 ? html`<div class="fs-marker" @click="${e => this.merge(column)}"></div>` : html``;
      cols.push(html`<div class="fs-cell ${this.animations.indexOf(column) >= 0 ? "animation-target" : ""} colspan-${field.colspan ? field.colspan : 12}">${marker}<formsey-field-cell .row="${row}" .column="${column}" .factory="${this.factory}" .definition=${field} @cellChanged="${(e: ChangeEvent) => this.change(e)}" @cellSplit="${(e: SplitEvent) => this.split(field, e)}"></formsey-field-cell></div>`);
      if (columns >= 12) {
        const deleteIndex = row;
        cols.push(html`<div class="removeRow  ${this.animations.indexOf(column) >= 0 ? "animation-target" : ""}"><button @click="${e => this.deleteRow(deleteIndex, e)}">-</button></div>`)
        rows.push(html`<div class="fs-row">${cols}</div>`);
        columns = 0;
        cols = [];
      }
    }
    return html`${rows}<div class="addRow"><button @click=${this.addRow}>+</button></div>`
  }

  updated() {
    let that = this;
    setTimeout(function () {
      if (that.shadowRoot) {
        let divs = that.shadowRoot.querySelectorAll(".animation-target");
        for (let i = 0; i < divs.length; ++i) {
          (<HTMLElement>divs[i]).classList.remove("animation-target");
        }
        that.animations = [];
      }
    }, 1000);
  }

  protected change(e: ChangeEvent) {
    this.value[e.index] = e.definition;
    this.fireEvent();
    if (e.definition.type) {
      this.requestUpdate();
    }
  }

  protected addRow(index: number, below: boolean) {
    this.value.push({})
    this.animations.push(this.value.length-1);
    this.requestUpdate();
    this.fireEvent();
  }

  protected deleteRow(index: number, e: any) {
    console.log("Delete index="+index);
    let cols = 0;
    while (cols < 12) {
      cols += this.value[index].colspan || 12;
      this.value.splice(index--, 1)
      this.requestUpdate();
      this.fireEvent();
    }
  }

  protected split(field: FieldDefinition, e: SplitEvent) {
    let index = e.index;
    this.value[index].colspan = e.left;
    this.value.splice(index + 1, 0, { colspan: e.right });
    this.animations.push(index);
    this.animations.push(index + 1);
    this.requestUpdate();
    this.fireEvent();
  }

  protected merge(index: number) {
    this.animations.push(index);
    let field = this.value[index];
    field.colspan = field.colspan || 12;
    // Find row start / end
    let cols = 0, rowStart = 0, rowEnd = 0;
    let found = false;
    for (let i = 0; i < this.value.length; i++) {
      if (i == index) {
        found = true;
      }
      cols += this.value[i].colspan || 12
      if (cols == 12) {
        cols = 0;
        if (found) {
          rowEnd = i;
          break;
        } else {
          rowStart = i;
        }
      }
    }
    if (index < rowEnd) {
      // Merge with right cell
      let rightCell = this.value[index + 1];
      field.colspan += rightCell.colspan || 12
      this.value.splice(index + 1, 1);
    } else if (index > rowStart) {
      let leftCell = this.value[index - 1];
      field.colspan += leftCell.colspan || 12
      this.value.splice(index - 1, 1);
    }
    this.requestUpdate();
    this.fireEvent();
  }

  protected fireEvent() {
    let newValue: FieldDefinition[] = [];
    for (let value of this.value) {
      newValue.push(value);
    }
    this.dispatchEvent(new ValueChangedEvent<FieldDefinition[]>(this.definition.name, newValue));
  }
}