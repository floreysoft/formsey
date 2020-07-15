import { register } from '@formsey/core';
import { NestedFormField as CoreNestedFormField } from '@formsey/core/NestedFormField';
import { css } from 'lit-element';
import { NESTED_FORM_STYLE } from './styles';

export class NestedFormField extends CoreNestedFormField {
  static get styles() {
    return [...super.styles, NESTED_FORM_STYLE]
  }
}
register("formsey-nested-form", NestedFormField, ["material", "native", "vaadin"], "nestedLayout", { importPath: "@formsey/fields-native/NestedFormField"})
register("formsey-nested-form", NestedFormField, ["material", "native", "vaadin"], "nestedForm", { importPath: "@formsey/fields-native/NestedFormField"})