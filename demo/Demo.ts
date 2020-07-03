import '@floreysoft/splitter';
import '@floreysoft/tabs';
import '@floreysoft/ace';
import '@formsey/fields-native';
import '@formsey/fields-vaadin';
import { css, CSSResult, customElement, html, LitElement, property, query } from "lit-element";
import { NodePart, directive } from 'lit-html'
import { Ace } from '@floreysoft/ace'
import { Form, FormDefinition } from '@formsey/core';
import { get } from '@formsey/core/Form';

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
    return html`<fs-splitter><div class="description"><formsey-form id="left" src="https://cdn.formsey.com/MonYjcP85Txw9jbHgjEg/rqp4BEKkVMjUfU1LmJl9" @change="${this.descriptionChanged}"></formsey-form></div><div class="form"><formsey-form id="right" src="https://www.formsey.com/live/GICKa9Zi7VFBEuWofBC4" @change="${this.formChanged}" @load="${this.formLoaded}"></formsey-form></div></fs-splitter>`
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

  value = directive((key : string, placeholder? : string) => (part : NodePart) => part.setValue(get(this.form?.value, key) || placeholder ))

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
      </fs-tabs>
    </fs-theme>`
  }
}