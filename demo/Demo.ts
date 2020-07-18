import '@floreysoft/ace';
import { Ace } from '@floreysoft/ace';
import '@floreysoft/splitter';
import '@floreysoft/tabs';
import '@floreysoft/theme';
import { ButtonFieldDefinition, Form, FormDefinition, InteractiveFieldDefinition } from '@formsey/core';
import { get } from '@formsey/core/Form';
import '@formsey/core/FormNavigator';
import { FormNavigator } from '@formsey/core/FormNavigator';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import '@formsey/fields-native-extended';
import '@formsey/fields-vaadin';
import { css, CSSResult, customElement, html, LitElement, query } from "lit-element";
import { directive, NodePart } from 'lit-html';

@customElement("formsey-demo1")
export class FormseyDemo1 extends LitElement {
  @query(".code")
  valueEditor: Ace

  @query("#left")
  left: Form

  @query("#right")
  right: Form

  static get styles(): CSSResult {
    return css`
    fs-splitter {
      border-top: 1px solid var(--fs-border-color);
      height: 100%;
    }
    .form {
      border-left: 1px solid var(--fs-border-color);
      overflow-y: auto;
      width: 50%;
    }
    .description {
      background-color: var(--fs-background-color);
      overflow-y: auto;
      width: 50%;
    }
    `
  }

  render() {
    return html`<fs-splitter><div class="description"><formsey-form id="left" src="https://cdn.formsey.com/MonYjcP85Txw9jbHgjEg/rqp4BEKkVMjUfU1LmJl9" @input="${this.descriptionChanged}"></formsey-form></div><div class="form"><formsey-form id="right" src="https://www.formsey.com/live/Qsk52cW5nqILic2lMikh" @input="${this.formChanged}" @load="${this.formLoaded}"></formsey-form></div></fs-splitter>`
  }

  descriptionChanged(e: CustomEvent) {
    this.right.definition = JSON.parse(e.detail.value['definition'])
    this.right.value = JSON.parse(e.detail.value['enteredValue'])
  }

  formChanged(e: CustomEvent) {
    this.left.value = { definition: JSON.stringify(this.right.definition, null, 2), enteredValue: JSON.stringify(e.detail.value, null, 2) }
  }

  formLoaded(e: CustomEvent) {
    this.left.value = { definition: JSON.stringify(e.detail.definition, null, 2), enteredValue: JSON.stringify(e.detail.value, null, 2) }
  }
}

@customElement("formsey-demo2")
export class FormseyDemo2 extends LitElement {
  @query("#right")
  form: Form

  value = directive((key: string, placeholder?: string) => (part: NodePart) => part.setValue(get(this.form?.value, key) || placeholder))

  private definition: FormDefinition = {
    type: "form",
    fields: [
      {
        type: "string",
        name: "name",
        label: html`Enter your name, ${this.value("name", "User")}`
      },
      {
        type: "number",
        name: "age",
        label: html`Hello ${this.value("name", "Organization")}, Enter your age`
      }
    ]
  }

  static get styles(): CSSResult {
    return css`
    fs-splitter {
      border-top: 1px solid var(--fs-border-color);
      height: 100%;
    }
    .form {
      border-left: 1px solid var(--fs-border-color);
      overflow-y: auto;
    }
    .description {
      background-color: var(--fs-background-color);
      overflow-y: auto;
    }
    `
  }

  render() {
    return html`<fs-splitter><div class="description"></div><div class="form"><formsey-form id="right" .definition="${this.definition}"></formsey-form></div></fs-splitter>`
  }
}

@customElement("formsey-demo3")
export class CustomValidityDemo extends LitElement {
  @query("#right")
  form: Form

  @query("formsey-form-navigator")
  formNavigator: FormNavigator

  private definition: FormDefinition = {
    type: "form",
    fields: [
      {
        type: "string",
        name: "name",
        label: "Name"
      },
      {
        type: "number",
        name: "age",
        label: "Age",
        required: true
      } as InteractiveFieldDefinition,
      {
        type: "button",
        buttonType: "submit",
        name: "submit",
        label: "Submit"
      } as ButtonFieldDefinition
    ]
  }

  static get styles(): CSSResult {
    return css`
    fs-splitter {
      border-top: 1px solid var(--fs-border-color);
      height: 100%;
    }
    .form {
      border-left: 1px solid var(--fs-border-color);
      display: flex;
      flex-direction: column;
    }
    .form formsey-form {
      padding: .5em;
      overflow-y: auto;
    }
    .description {
      background-color: var(--fs-background-color);
      overflow-y: auto;
    }
    `
  }

  render() {
    return html`<fs-splitter><div class="description"><button @click="${this.setCustomValidity}">Report custom validity</button><button @click="${this.clearCustomErrors}">Clear custom errors</button><button @click="${this.reportValidity}">Report validity</button></div>
    <div class="form">
      <formsey-form-navigator @focusField="${(e: CustomEvent) => { console.log(e.detail); this.form.focusField(e.detail) }}"></formsey-form-navigator>
      <formsey-form id="right" src="https://www.formsey.com/live/GICKa9Zi7VFBEuWofBC4" @load="${e => { this.formNavigator.components = this.form.components; this.formNavigator.definition = this.form.definition; this.formNavigator.value = this.form.value }}" @change="${e => { console.log("Value changed"); this.formNavigator.value = e.detail.value }}" @focus="${this.f}" @invalid="${(e: InvalidEvent) => this.formNavigator.errors = e.errors}"></formsey-form>
    </div></fs-splitter>`
  }

  f(e) {
    this.formNavigator.focusedPath = e.detail.name
  }

  setCustomValidity() {
    this.form.setCustomValidity(new InvalidErrors().set("name", { "validityMessage": "My custom error message" }));
  }

  clearCustomErrors() {
    this.form.clearCustomValidity()
  }

  reportValidity() {
    this.form.reportValidity()
  }
}

@customElement("fs-demo")
export class Demo extends LitElement {
  static get styles(): CSSResult {
    return css`
    :host {
      height: 100%;
    }
    fs-tabs {
        height: 100%;
    }
`
  }

  render() {
    return html`
    <fs-theme>
      <fs-tabs>
        <fs-tab label="Simple" selected><formsey-demo1></formsey-demo1></fs-tab>
        <fs-tab label="Zwo" selected><formsey-demo2></formsey-demo2></fs-tab>
        <fs-tab label="Drei" selected><formsey-demo3></formsey-demo3></fs-tab>
      </fs-tabs>
    </fs-theme>`
  }
}