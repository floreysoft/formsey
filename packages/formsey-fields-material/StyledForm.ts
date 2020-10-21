import { Components, registerComponent, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { css, html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';

export class StyledForm extends Form {
  static get styles() {
    return [...super.styles, css`
    .themed {
      background-color: var(--formsey-background-color, var(--fs-background-color, inherit));
    }
  `]
  }

  render() {
    let field = undefined
    if (this.definition) {
      field = createField(this.components, this.settings, this.definition, this.value, this.definition?.name, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event), 'form');
    }
    const form = html`<slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.action)}" method="${ifDefined(this.method)}" target="${ifDefined(this.target)}">${field}<slot></slot></form>`
    return this.settings ? html`<fs-theme theme=${ifDefined(this.settings?.options['theme'])}><div class="themed">${form}</div></fs-theme>` : form
  }

  protected changed(e: ValueChangedEvent<any>) {
     this.dispatchEvent(new ValueChangedEvent(e.type as  "change" | "input" | "inputChange", e.detail.name, e.detail.value));
  }

  protected invalid(e: InvalidEvent) {
    e.stopPropagation()
    this.dispatchEvent(new InvalidEvent(e.errors));
  }
}

registerComponent({
  type: "styledForm",
  tag: "formsey-styled-form-material",
  constructor: StyledForm,
  libraries: ["material" ],
  importPath: "@formsey/fields-material/StyledForm",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-styled-form-material id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form-material>`
  }
})