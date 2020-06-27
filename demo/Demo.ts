import '@floreysoft/splitter';
import '@floreysoft/tabs';
import '@floreysoft/ace';
import '@formsey/fields-native';
import '@formsey/fields-native-extended';
import '@formsey/fields-vaadin';
import { css, CSSResult, customElement, html, LitElement, property, query } from "lit-element";
import { Ace } from '@floreysoft/ace'
import { Form } from '@formsey/core';

@customElement("formsey-demo")
export class FormseyDemo extends LitElement {
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
    }
    .description {
      background-color: var(--fs-background-color);
      overflow-y: auto;
    }
    `
  }

  render() {
    return html`<fs-splitter><div class="description"><formsey-form id="left" src="https://cdn.formsey.com/MonYjcP85Txw9jbHgjEg/dx2dJCism2x4OfnUtqFk" @change="${this.descriptionChanged}"></formsey-form></div><div class="form"><formsey-form id="right" src="https://www.formsey.com/live/GICKa9Zi7VFBEuWofBC4" @change="${this.formChanged}"></formsey-form></div></fs-splitter>`
  }

  descriptionChanged(e: CustomEvent) {
    this.right.definition = JSON.parse(e.detail.value['definition'])
    this.right.value = JSON.parse(e.detail.value['enteredValue'])
  }

  formChanged(e: CustomEvent) {
    this.left.value = { definition: JSON.stringify(this.right.definition, null, 2), enteredValue: JSON.stringify(e.detail.value, null, 2) }
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
      <fs-tabs><fs-tab label="Simple" selected><formsey-demo></formsey-demo></fs-tab></fs-tabs>
    </fs-theme>`
  }
}