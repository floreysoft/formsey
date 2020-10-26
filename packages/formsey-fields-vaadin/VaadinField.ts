import { Field } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import "@material/mwc-checkbox/mwc-checkbox.js";
import "@material/mwc-formfield/mwc-formfield.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group.js";
import "@vaadin/vaadin-checkbox/vaadin-checkbox.js";
import { html, TemplateResult } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

export abstract class VaadinField<T extends FieldDefinition, V> extends Field<T, V> {
  protected render(): void | TemplateResult {
    return html`<div class="${classMap({ wrapper: true, invalid: !this.valid && this.report })}">${this.renderHeader()}${this.renderField()}${this.renderFooter()}</div>`
  }

  abstract renderField() : TemplateResult | undefined

  renderHeader() {
    return
  }

  renderFooter() {
    return this.definition.helpText && (this.valid || !this.report) ? html`<div class="lfht">${this.definition.helpText}</div>` : undefined
  }
}