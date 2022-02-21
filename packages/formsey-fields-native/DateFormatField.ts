import { DateFormatFieldDefinition, LabelFieldDefinition } from '@formsey/core/FieldDefinitions';
import { getLibrary, Resources } from '@formsey/core/Registry';
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { LabelField } from '.';

@customElement("formsey-dateformat")
export class DateFormatField extends LabelField<DateFormatFieldDefinition> {
  protected format(value: any) {
    const date = new Date(value)
    if ( this.definition ) {
      return new Intl.DateTimeFormat(this.definition.locale || navigator.language, { dateStyle: this.definition.dateStyle, timeStyle: this.definition.timeStyle } as Intl.DateTimeFormatOptions).format(date)
    } else {
      return value;
    }
  }
}
getLibrary("native").registerComponent("dateFormat", {
  importPath: "@formsey/fields-native/DateFormatField",
  template: ({ library, context, settings, definition, value, parentPath, errors, changeHandler, inputHandler, invalidHandler, id }: Resources<LabelFieldDefinition, any>) => {
    return html`<formsey-dateformat id="${ifDefined(id)}" .library=${library} .settings=${settings} .definition=${definition as any} .context=${context} .value=${value} .parentPath=${parentPath}></formsey-dateformat>`
  }
})