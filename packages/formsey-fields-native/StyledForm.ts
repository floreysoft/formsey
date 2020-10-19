import { Components, register, Settings } from '@formsey/core/Components';
import { createField } from '@formsey/core/Field';
import { FieldDefinition } from '@formsey/core/FieldDefinitions';
import { Form } from '@formsey/core/Form';
import { InvalidErrors, InvalidEvent } from '@formsey/core/InvalidEvent';
import { ValueChangedEvent } from '@formsey/core/ValueChangedEvent';
import { html } from "lit-element";
import { ifDefined } from 'lit-html/directives/if-defined';
import { FORM_STYLES } from './styles';

export class StyledForm extends Form {
  static get styles() {
    return [...super.styles, FORM_STYLES]
  }

  render() {
    let field = undefined
    if (this.definition) {
      field = createField(this.components, this.settings, this.definition, this.value, this.definition?.name, this.errors, (event: ValueChangedEvent<any>) => this.changed(event), (event: InvalidEvent) => this.invalid(event), 'form');
    }
    const content = html`<h1>STYLED</h1><slot name="top"></slot><form novalidate @submit="${this.submit}" action="${ifDefined(this.action)}" method="${ifDefined(this.method)}" target="${ifDefined(this.target)}">${field}<slot></slot></form>`
    return content
  }
}

register({
  type: "styledForm",
  tag: "formsey-styled-form",
  constructor: StyledForm,
  libraries: ["native" ],
  importPath: "@formsey/fields-native/StyledForm",
  factory: (components: Components, settings: Settings, definition: FieldDefinition, value: Object, parentPath: string, errors: InvalidErrors, changeHandler: any, invalidHandler: any, id?: string) => {
    return html`<formsey-styled-form id="${ifDefined(id)}" .components=${components} .settings=${settings} .definition=${definition} .value=${value} .parentPath=${parentPath} .errors=${errors} @change="${changeHandler}" @input="${changeHandler}" @inputChange="${changeHandler}" @invalid=${invalidHandler}></formsey-styled-form>`
  }
})